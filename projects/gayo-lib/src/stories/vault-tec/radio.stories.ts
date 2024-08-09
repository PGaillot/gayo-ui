
// Component radio was generated on Sat Aug 10 2024 01:00:20 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from "@storybook/angular";
import { RadioComponent } from "../../lib/components/vault-tec/radio/radio.component";


const meta:Meta<RadioComponent> = {
  title:'Vault-Tec/Radio',
  component:RadioComponent,
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<RadioComponent>;

export const SimpleRadio: Story = {
  args: {
    label: 'Simple Radio',
    checked: false,
  },
};

export const CheckedRadio: Story = {
  args: {
    ...SimpleRadio.args,
    checked: true,
  },
};

export const DisabledRadio: Story = {
  args: {
    ...SimpleRadio.args,
    disabled: true,
  },
};

export const WitoutLabel: Story = {
  args: {},
};
