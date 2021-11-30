import React from 'react';
import { MainHeader } from './MainHeader';
import { Announcement } from './Announcement';

type MainLayoutProps = {
  children: React.ReactNode;
};

import { DesktopNavbarLeft } from './DesktopNavbarLeft';
import { DesktopAsideRight } from './DesktopAsideRight';

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-full">
      <MainHeader />
      <Announcement />
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <DesktopNavbarLeft />
          <main className="lg:col-span-9 xl:col-span-6">{children}</main>
          <DesktopAsideRight />
        </div>
      </div>
    </div>
  );
};
