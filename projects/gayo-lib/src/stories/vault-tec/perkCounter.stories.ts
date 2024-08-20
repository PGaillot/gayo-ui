
// Component perkCounter was generated on Tue Aug 20 2024 15:13:03 GMT+0200 (heure d’été d’Europe centrale)

import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { PerkCounterComponent } from "../../lib/components/vault-tec/perk-counter/perk-counter.component";


const meta: Meta<PerkCounterComponent> = {
  title: 'Vault-Tec/PerkCounter',
  component: PerkCounterComponent,
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<PerkCounterComponent>;

export const SimplePerkCounter: Story = {
  args: {
    perkName: 'strength'
  },
  render: () => ({

    template: `
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 8px;">
        <vt-perk-counter perkName="strength"></vt-perk-counter>
        <vt-perk-counter perkName="perception"></vt-perk-counter>
        <vt-perk-counter perkName="endurance"></vt-perk-counter>
        <vt-perk-counter perkName="charisma"></vt-perk-counter>
        <vt-perk-counter perkName="intelligence"></vt-perk-counter>
        <vt-perk-counter perkName="agility"></vt-perk-counter>
        <vt-perk-counter perkName="luck"></vt-perk-counter>
      </div>
    `
  }),
}
