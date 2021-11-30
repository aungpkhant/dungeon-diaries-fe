import { Meta, Story } from '@storybook/react';
import { InputFieldProps } from '.';

import { InputField } from './InputField';

const meta: Meta = {
  title: 'Components/Forms/InputField',
  component: InputField,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<InputFieldProps> = (props) => <InputField {...props} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Email',
};

export const Errored = Template.bind({});
Errored.args = {
  label: 'Input With Error',
  error: { type: 'required', message: 'asdf' },
};
