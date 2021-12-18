type UserRole = null | 'admin' | 'moderator';

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};
