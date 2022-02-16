import clsx from 'clsx';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';

import { Link } from '@/components/Elements';
import { MAIN_LINKS } from '@/constants';
import { useAuth } from '@/hooks/useAuth';

const userNavigation = [{ name: 'Your Profile', href: '#' }];

const MobilePopoverPanel = () => {
  const { user, logout } = useAuth();

  return (
    <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
      <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
        {MAIN_LINKS.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                isActive ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600 hover:bg-gray-200',
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              )
            }
          >
            <item.icon className={clsx('flex-shrink-0 -ml-1 mr-3 h-6 w-6')} aria-hidden="true" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={user?.profile_image ?? '/assets/default_profile.png'}
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">{user?.username}</div>
            <div className="text-sm font-medium text-gray-500">{user?.email}</div>
          </div>
        </div>
        <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
          <Link
            to={`/app/profile/${user?.id}`}
            className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Your Profile
          </Link>
          <button
            className="block text-left w-full rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/app/new-post" _type="button" size="lg" className="w-full">
          New Post
        </Link>
      </div>
    </Popover.Panel>
  );
};

const ProfileMenu = () => {
  const { user, logout } = useAuth();

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <Link
                to={`/app/profile/${user?.id}`}
                className={clsx(
                  active ? 'bg-gray-100' : '',
                  'w-full text-left block py-2 px-4 text-sm text-gray-700'
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
        ))}
        <Menu.Item>
          {({ active }) => (
            <button
              className={clsx(
                active ? 'bg-gray-100' : '',
                'w-full text-left block py-2 px-4 text-sm text-gray-700'
              )}
              onClick={logout}
            >
              Log out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};

const MobileMenu = ({ open }: { open: boolean }) => {
  return (
    <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
      {/* Mobile menu button */}
      <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
        <span className="sr-only">Open menu</span>
        {open ? (
          <XIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Popover.Button>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
      <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm disabled:opacity-40"
              placeholder="Search"
              type="search"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeIconSection = () => {
  const { user } = useAuth();

  return (
    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
      <div className="flex-shrink-0 flex items-center">
        <Link to={user ? '/app/feed' : '/'}>
          <img className="block h-10 w-auto" src="/dd-favicon.png" alt="Dungeon Diaries" />
        </Link>
      </div>
    </div>
  );
};

export const MainHeader = () => {
  /* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */
  const { user } = useAuth();

  return (
    <Popover
      as="header"
      className={({ open }) =>
        clsx(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white  lg:static lg:overflow-y-visible'
        )
      }
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <HomeIconSection />
              <SearchBar />
              <MobileMenu open={open} />
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                {/* Profile dropdown */}
                <Menu as="div" className="flex-shrink-0 relative ml-5">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full bg-gray-200"
                        src={user?.profile_image ?? '/assets/default_profile.png'}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <ProfileMenu />
                </Menu>

                <Link to="/app/new-post" _type="button" size="md" className="ml-6">
                  New Post
                </Link>
              </div>
            </div>
          </div>
          <MobilePopoverPanel />
        </>
      )}
    </Popover>
  );
};
