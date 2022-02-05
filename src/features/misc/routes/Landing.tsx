import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { useAuth } from '@/hooks/useAuth';

export const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    user ? navigate('/app/feed') : navigate('/auth/login');
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">Dungeon Diaries</span>
                    <img
                      className="block h-10 w-auto"
                      src="/dd-favicon.png"
                      alt="Dungeon Diaries"
                    />
                  </a>
                  <div className="ml-4">
                    <h1 className="text-indigo-600 font-bold text-2xl font-heading">
                      Dungeon Diaries
                    </h1>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">A social platform</span>{' '}
                <span className="block text-indigo-600 xl:inline">for dogs by dogs</span>
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                &ldquo;On the internet, no one knows you&apos;re a dog&rdquo; - Bark Obama
              </p>
              <div className="mt-5 sm:mt-8 flex sm:justify-center lg:justify-start">
                <Button size="md" onClick={handleSubmit}>
                  Enter the Dungeon
                </Button>
                <div className="ml-3">
                  <Button size="md" variant="secondary">
                    Github Repo
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
