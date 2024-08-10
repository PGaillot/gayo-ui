
// Component perkCard was generated on Sat Aug 10 2024 22:37:24 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from "@storybook/angular";
import { PerkCardComponent } from "../../lib/components/vault-tec/perk-card/perk-card.component";


const meta:Meta<PerkCardComponent> = {
  title:'Vault-Tec/PerkCard',
  component:PerkCardComponent,
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<PerkCardComponent>;

export const SimplePerkCard:Story = {
  args:{
      content:'lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !',
      perkName:'strength'
  }
}

export const Agility:Story = {
  args:{
      content:'lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !',
      perkName:'agility'
  }
}
    