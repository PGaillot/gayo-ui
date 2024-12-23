import { Meta, StoryObj } from "@storybook/angular";
import { CandleCardComponent } from "../../lib/components/summon-demon/candle-card/candle-card.component";

const meta:Meta<CandleCardComponent> = {
    title:'SummonDemon/CandleCard',
    component:CandleCardComponent,
    tags: ['autodocs'],
}

export default meta;


type Story = StoryObj<CandleCardComponent>;


export const BougieDeDebutant: Story = {
  args: {
    cardName: 'bougie de débutant',
    diceNumbers: [6,8],
    id:71
  }
}

export const CiergeMalefique: Story = {
  args: {
    cardName: 'cierge maléfique',
    diceNumbers: [8,9],
    id:72
  }
}

export const DouceBougie: Story = {
  args: {
    cardName: 'douce bougie',
    diceNumbers: [5,6],
    id:70
  }
}

export const GentilleBougie: Story = {
  args: {
    cardName: 'gentille bougie',
    diceNumbers: [3,4,5],
    id:69
  }
}

export const CiergeDiabolique: Story = {
  args: {
    cardName: 'cierge diabolique',
    diceNumbers: [9,10,11],
    id:73
  }
}
