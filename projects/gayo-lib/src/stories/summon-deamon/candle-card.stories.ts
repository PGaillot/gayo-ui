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
    cardName: 'Bougie de débutant',
    diceNumber: [6,5,4]
  }
}
