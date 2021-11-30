import { QueryClient, DefaultOptions } from 'react-query';

// TODO implement and useErrorBoundary
const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
