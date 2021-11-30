import React from 'react';
import clsx from 'clsx';

import { NavLink } from 'react-router-dom';

import { MAIN_LINKS } from '@/constants';

export const DesktopNavbarLeft = () => {
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
        <div className="pb-8 space-y-1">
          {MAIN_LINKS.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  isActive ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-200',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                )
              }
            >
              <item.icon className={clsx('flex-shrink-0 -ml-1 mr-3 h-6 w-6')} aria-hidden="true" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
