import clsx from 'clsx';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const _types = {
  link: 'text-yellow-500 hover:text-yellow-600 rounded-md',
  button:
    'inline-flex items-center justify-center font-retro font-semibold retro-btn retro-btn--primary py-2 px-4 text-sm',
};

const sizes = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-md',
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
