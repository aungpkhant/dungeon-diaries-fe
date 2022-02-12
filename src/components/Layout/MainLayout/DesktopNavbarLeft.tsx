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
                  isActive ? '' : '',
                  'retro-btn retro-btn--secondary group flex items-center px-3 py-2 text-sm font-medium'
                )
              }
            >
              <item.icon className={clsx('flex-shrink-0 mr-3 h-6 w-6')} aria-hidden="true" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
