import * as React from 'react';
import clsx from 'clsx';

type HeadingProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Heading = ({ className, children }: HeadingProps) => {
  return (
    <div className="px-2 sm:px-0">
      <h2 className={clsx('text-gray-800 text-xl font-medium', className)}>{children}</h2>
    </div>
  );
};
