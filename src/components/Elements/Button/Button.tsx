import * as React from 'react';
import clsx from 'clsx';
import { Spinner } from '..';

const variants = {
  primary: 'text-white bg-indigo-600 hover:bg-indigo-700',
  secondary: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200',
};

const sizes = {
  sm: 'py-2 px-3 text-sm rounded-md',
  md: 'py-2 px-4 text-sm rounded-md',
  lg: 'py-3 px-6 text-md rounded-md',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  isLoading?: boolean;
  size?: keyof typeof sizes;
  className?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'inline-flex items-center justify-center font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="mr-2 text-current" variant="inherit" />}
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';
