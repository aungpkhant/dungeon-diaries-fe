import { Meta, Story } from '@storybook/react';

import { Link } from './Link';

const meta: Meta = {
  title: 'Components/Elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (props) => <Link to="/" {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Example Link',
  className: '',
};

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  _type: 'button',
  children: 'Link that looks like a Button',
  className: '',
  size: 'md',
};
