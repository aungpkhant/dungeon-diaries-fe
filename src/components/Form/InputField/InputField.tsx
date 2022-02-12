import * as React from 'react';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

const states = {
  valid: 'border-gray-700 placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500',
  invalid:
    'border-red-400 text-red-800 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
};

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  error?: FieldError | undefined;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
          <input
            className={clsx(
              'border-4 appearance-none block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm',
              states[error?.message ? 'invalid' : 'valid'],
              className
            )}
            {...props}
            ref={ref}
          />
        </div>
        {error?.message && (
          <div
            role="alert"
            aria-label={error.message}
            className="text-sm font-semibold text-red-500 mt-1"
          >
            {error.message}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
