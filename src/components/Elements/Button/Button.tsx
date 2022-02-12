import * as React from 'react';
import clsx from 'clsx';
import { Spinner } from '..';

const variants = {
  primary: 'retro-btn retro-btn--primary',
  secondary: 'retro-btn retro-btn--secondary',
  danger: 'retro-btn retro-btn--danger',
  ghost: 'text-gray-400 hover:text-indigo-500',
  custom: '',
};

const sizes = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-2.5 px-4 text-base',
  lg: 'py-3 px-6 text-md',
  custom: '',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  isLoading?: boolean;
  size?: keyof typeof sizes;
  className?: string;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className = '',
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'font-retro font-semibold inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="mr-2 text-current" variant="inherit" />}
        {!isLoading && startIcon && <span className="mr-2">{startIcon}</span>}
        {props.children}
        {!isLoading && endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
