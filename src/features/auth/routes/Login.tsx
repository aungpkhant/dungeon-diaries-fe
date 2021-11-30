import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { Button, Link } from '@/components/Elements';
import { InputField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth/useAuth';

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(3, 'Password should be at least 3 characters long'),
});

const LoginHeader = () => (
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    Log in to <Link to="/">Dungeon Diaries</Link>
  </h2>
);

export const Login = () => {
  const methods = useForm({ resolver: zodResolver(schema) });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: any) => {
    await login(data);
    navigate('/');
  };

  return (
    <Layout header={<LoginHeader />}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(handleLoginSubmit)}>
        <InputField
          label="Email Address"
          {...methods.register('email')}
          error={methods.formState.errors['email']}
          type="email"
          autoComplete="email"
        />
        <InputField
          label="Password"
          {...methods.register('password')}
          error={methods.formState.errors['password']}
          type="password"
          id="current-password"
        />
        <div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </div>
      </form>
      <div className="flex items-center mt-6">
        <div className="ml-auto text-sm">
          <Link to="/auth/register" className="font-medium">
            No Account? Register
          </Link>
        </div>
      </div>
    </Layout>
  );
};
