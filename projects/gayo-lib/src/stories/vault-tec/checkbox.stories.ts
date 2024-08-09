// Component checkbox was generated on Sat Aug 10 2024 00:51:32 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../lib/components/vault-tec/checkbox/checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Vault-Tec/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const SimpleCheckbox: Story = {
  args: {
    label: 'Simple Checkbox',
    checked: false,
  },
};

export const CheckedCheckbox: Story = {
  args: {
    ...SimpleCheckbox.args,
    checked: true,
  },
};

export const DisabledCheckbox: Story = {
  args: {
    ...SimpleCheckbox.args,
    disabled: true,
  },
};

export const WitoutLabel: Story = {
  args: {},
};
