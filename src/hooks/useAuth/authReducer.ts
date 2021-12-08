import { AuthUser } from '@/features/auth/types';

type AuthState = {
  user: null | AuthUser;
  status: 'loading' | 'success' | 'error' | 'idle';
  error: any;
};

type ActionType =
  | { type: 'REQUEST/user' }
  | { type: 'OK/user'; payload: AuthUser }
  | {
      type: 'ERROR/user';
      payload: any;
    }
  | {
      type: 'LOGOUT/user';
    };

export const initAuthState: AuthState = {
  user: null,
  status: 'loading',
  error: null,
};

export const authReducer = (state: AuthState, action: ActionType): AuthState => {
  switch (action.type) {
    case 'REQUEST/user':
      return {
        ...state,
        user: null,
        error: null,
        status: 'loading',
      };
    case 'OK/user':
      return {
        ...state,
        user: action.payload,
        error: null,
        status: 'success',
      };
    case 'ERROR/user':
      return {
        ...state,
        user: null,
        error: action.payload,
        status: 'error',
      };
    case 'LOGOUT/user':
      return { ...initAuthState, status: 'idle' };
    default:
      throw new Error('Must provide valid action type');
  }
};
