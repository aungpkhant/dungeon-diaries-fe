import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import SimpleReactLightbox from 'simple-react-lightbox';

import { Notifications } from '@/components/Notifications';
import { ProvideAuth } from '@/hooks/useAuth';
import { queryClient } from '@/lib/react-query';
import { Button } from '@/components/Elements';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return (
    <div
      className="text-red-700 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <Notifications />
        <BrowserRouter>
          <ProvideAuth>
            <SimpleReactLightbox>{children}</SimpleReactLightbox>
          </ProvideAuth>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
