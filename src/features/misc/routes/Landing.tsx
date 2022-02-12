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
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8  sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <div className="bg-white pb-8">
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
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl text-center">
                  <span className="block xl:inline">A next generation</span>
                  <span className="block text-indigo-600 ">social platform</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:text-2xl lg:mx-0 text-center">
                  Join hunderds of dungeon crawlers sharing their adventures
                </p>
                <div className="mt-8 sm:mt-8 flex justify-center ">
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

          <section className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className=" lg:text-left">
              <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl text-center">
                <span className="block xl:inline">What we offer</span>
              </h2>

              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
                <div className="grid-cols-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="url(#fire-grad)"
                  >
                    <defs>
                      <linearGradient id="fire-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0" style={{ stopColor: '#a93aff', stopOpacity: 1 }} />
                        <stop offset="1" style={{ stopColor: '#ff81ff', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-heading text-2xl font-bold mt-4">Amazing Community</h4>
                  <p className="mt-4 text-gray-500">
                    A tight-knit community of the realest, bravest adventurers. Share your main
                    quest with other like-minded hustlers.
                  </p>
                </div>
                <div className="grid-cols-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="url(#poll-grad)"
                  >
                    <defs>
                      <linearGradient id="poll-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0" style={{ stopColor: '#00b59c', stopOpacity: 1 }} />
                        <stop offset="1" style={{ stopColor: '#9cffac', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <h4 className="font-heading text-2xl font-bold mt-4">Weekly Polls</h4>
                  <p className="mt-4 text-gray-500">
                    Participate in fun weekly challenges. Claim your fame by showcasing your wisdom
                    stats.
                  </p>
                </div>
                <div className="grid-cols-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="url(#power-grad)"
                  >
                    <defs>
                      <linearGradient id="power-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0" style={{ stopColor: '#fd5900', stopOpacity: 1 }} />
                        <stop offset="1" style={{ stopColor: '#ffde00', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h4 className="font-heading text-2xl font-bold mt-4">Level Up</h4>
                  <p className="mt-4 text-gray-500">
                    Become a dragon-tier adventurer by engaging with other adventurers. Climb up
                    your way from being a measly Slime.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div> */}
    </div>
  );
};
