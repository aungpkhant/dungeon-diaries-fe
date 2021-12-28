import { Meta, Story } from '@storybook/react';

import { Dialog } from './Dialog';
import { Button } from '..';

import { useToggle } from '@/hooks/useToggle';

const meta: Meta = {
  title: 'Components/Elements/Dialog',
  component: Dialog,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const Demo: Story = () => {
  const { close, open, isOpen } = useToggle();

  const dialogProps = {
    title: 'Dialog Title',
    content: 'Are you sure you want to do this?',
    ActionButton: <Button onClick={close}>Confirm</Button>,
  };

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Dialog isOpen={isOpen} closeDialog={close} {...dialogProps} />
    </>
  );
};
