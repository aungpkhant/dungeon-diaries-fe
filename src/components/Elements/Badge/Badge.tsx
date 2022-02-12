import clsx from 'clsx';

const sizes = {
  medium: 'text-sm px-2.5 py-0',
  large: 'text-sm px-3 py-0.5',
};

export type BadgeProps = {
  size?: keyof typeof sizes;
  children?: React.ReactNode;
};

export const Badge = ({ size = 'medium', children }: BadgeProps) => {
  return <span className={clsx(sizes[size], 'badge--primary')}>{children}</span>;
};

Badge.displayName = 'Badge';
