import { Meta, Story } from '@storybook/react';

import { Heading } from './Heading';

const meta: Meta = {
  title: 'Components/Elements/Heading',
  component: Heading,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (props) => <Heading {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Example Heading',
  className: '',
};
