import clsx from 'clsx';

const sizes = {
  medium: 'text-xs px-2.5 py-0.5',
  large: 'text-sm px-3 py-0.5',
};

export type BadgeProps = {
  size?: keyof typeof sizes;
  children?: React.ReactNode;
};

export const Badge = ({ size = 'medium', children }: BadgeProps) => {
  return (
    <span
      className={clsx(
        sizes[size],
        'inline-flex items-center rounded font-medium bg-indigo-100 text-indigo-700'
      )}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
