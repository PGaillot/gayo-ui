import { Meta, StoryObj } from "@storybook/angular";
import { CandleCardComponent } from "../../lib/components/summon-demon/candle-card/candle-card.component";
import { candleCards } from "../../lib/datas/lsd/cards.data";

const meta:Meta<CandleCardComponent> = {
    title:'SummonDemon/CandleCard',
    component:CandleCardComponent,
    tags: ['autodocs'],
}

export default meta;


type Story = StoryObj<CandleCardComponent>;


export const BougieDeDebutant: Story = {
  args: {
candle:candleCards[0]
  }
}

export const CiergeMalefique: Story = {
  args: {
    candle:candleCards[1]

  }
}

export const DouceBougie: Story = {
  args: {
    candle:candleCards[2]
  }
}

export const GentilleBougie: Story = {
  args: {
    candle:candleCards[3]

  }
}

export const CiergeDiabolique: Story = {
  args: {
    candle:candleCards[4]

  }
}
