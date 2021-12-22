import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Layout } from '../components/Layout';
import { Button, Link } from '@/components/Elements';
import { InputField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth/useAuth';

const schema = z.object({
  username: z.string().min(5, 'Username should be at least 5 characters long'),
  password: z.string().min(3, 'Password should be at least 3 characters long'),
  email: z.string().min(1, 'Email is required'),
});

const RegisterHeader = () => (
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    Join <Link to="/">Dungeon Diaries</Link>
  </h2>
);

export const Register = () => {
  const methods = useForm({ resolver: zodResolver(schema) });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data: any) => {
    await register(data);
    navigate('/');
  };

  return (
    <Layout header={<RegisterHeader />}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(handleRegisterSubmit)}>
        <InputField
          label="Username"
          {...methods.register('username')}
          error={methods.formState.errors['username']}
        />
        <InputField
          label="Email Address"
          {...methods.register('email')}
          error={methods.formState.errors['email']}
          type="email"
          id="email"
          autoComplete="email"
        />
        <InputField
          label="Password"
          {...methods.register('password')}
          error={methods.formState.errors['password']}
          autoComplete="new-password"
          id="new-password"
          type="password"
        />
        <Button type="submit" className="w-full" isLoading={methods.formState.isSubmitting}>
          Register
        </Button>
      </form>
      <div className="flex items-center mt-6">
        <div className="ml-auto text-sm">
          <Link to="/auth/login" className="font-medium">
            Already Have an Account? Login
          </Link>
        </div>
      </div>
    </Layout>
  );
};
