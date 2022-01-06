import React, { useEffect, useContext, createContext, useReducer } from 'react';

import { AuthUser } from '@/features/auth/types';
import {
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout as logoutUser,
  LoginCredentialsDTO,
  getUser,
} from '@/features/auth';
import { authReducer, initAuthState } from './authReducer';
import { Spinner } from '@/components/Elements';
import { useNavigate } from 'react-router';

type AuthContextState = {
  user: null | AuthUser;
  updateUser: (userFields: Partial<AuthUser>) => void;
  register: (data: RegisterCredentialsDTO) => Promise<void>;
  login: (data: LoginCredentialsDTO) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextState);

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  if (auth.isFetching) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within the AuthProvider`);
  }
  return context;
};

function useProvideAuth() {
  const [authState, dispatch] = useReducer(authReducer, initAuthState);
  const navigate = useNavigate();

  const updateUser = (userFields: Partial<AuthUser>) => {
    dispatch({ type: 'UPDATE/user', payload: userFields });
  };

  const loadUser = async () => {
    try {
      dispatch({ type: 'REQUEST/user' });
      const response = await getUser();
      dispatch({ type: 'OK/user', payload: response });
    } catch (error) {
      dispatch({ type: 'ERROR/user', payload: error });
    }
  };

  const login = async (data: LoginCredentialsDTO) => {
    const user = await loginWithEmailAndPassword(data);
    dispatch({ type: 'OK/user', payload: user });
  };

  const register = async (data: RegisterCredentialsDTO) => {
    const user = await registerWithEmailAndPassword(data);
    dispatch({ type: 'OK/user', payload: user });
  };

  const logout = async () => {
    await logoutUser();
    dispatch({ type: 'LOGOUT/user' });
    navigate('/');
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user: authState.user,
    isFetching: authState.status === 'loading',
    updateUser,
    login,
    register,
    logout,
  };
}
