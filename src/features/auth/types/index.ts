type UserRole = 'ADMIN' | 'MODERATOR' | 'USER';

export type AuthUser = {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  bio: string;
  profile_image: string;
};
