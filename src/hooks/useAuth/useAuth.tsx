import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';

import { AuthUser } from '@/features/auth/types';
import {
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  LoginCredentialsDTO,
  getUser,
} from '@/features/auth';
import storage from '@/utils/storage';
import { authReducer, initAuthState } from './authReducer';
import { Spinner } from '@/components/Elements';

type AuthContextState = {
  user: null | AuthUser;
  register: (data: RegisterCredentialsDTO) => Promise<void>;
  login: (data: LoginCredentialsDTO) => Promise<void>;
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
    const response = await loginWithEmailAndPassword(data);
    storage.setToken(response.jwt);
  };

  const register = async (data: RegisterCredentialsDTO) => {
    const response = await registerWithEmailAndPassword(data);
    storage.setToken(response.jwt);
  };

  // const logout = () => {};

  // TODO call GetUser on mount w/ react query
  useEffect(() => {
    loadUser();
  }, []);

  return {
    user: authState.user,
    isFetching: authState.status === 'loading',
    login,
    register,
    // logout,
  };
}
