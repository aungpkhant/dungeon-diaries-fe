import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

import { Notifications } from '@/components/Notifications';
import { ProvideAuth } from '@/hooks/useAuth';
import { queryClient } from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      <Notifications />
      <BrowserRouter>
        <ProvideAuth>{children}</ProvideAuth>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
