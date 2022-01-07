import * as React from 'react';

type LayoutProps = { header: React.ReactNode; children?: React.ReactNode };

export const Layout = ({ header, children }: LayoutProps) => {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-auto" src="/dd-favicon.png" alt="Dungeon Diaries" />
          {header}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
        </div>
      </div>
    </>
  );
};
