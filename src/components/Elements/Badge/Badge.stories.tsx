import { Meta, Story } from '@storybook/react';

import { Badge, BadgeProps } from './Badge';

const meta: Meta = {
  title: 'Components/Elements/Badge',
  component: Badge,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BadgeProps> = (props) => <Badge {...props} />;

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  children: 'Medium Badge',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large Badge',
};
