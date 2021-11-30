import clsx from 'clsx';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const _types = {
  link: 'text-indigo-600 hover:text-indigo-900',
  button:
    'inline-flex items-center justify-center font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 text-sm rounded-md',
};

const sizes = {
  sm: 'py-2 px-3 text-sm rounded-md',
  md: 'py-2 px-4 text-sm rounded-md',
  lg: 'py-3 px-6 text-md rounded-md',
};

export type LinkProps = RouterLinkProps &
  LinkTypeProps & {
    className?: string;
  };

type LinkTypeProps =
  | {
      _type?: 'button';
      size: keyof typeof sizes;
    }
  | {
      _type?: 'link';
      size?: never;
    };

export const Link = ({ _type = 'link', size, className, children, ...props }: LinkProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <RouterLink className={clsx(_types[_type], sizes[size!], className)} {...props}>
      {children}
    </RouterLink>
  );
};
