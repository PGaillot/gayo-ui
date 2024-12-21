import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { SmallCardComponent } from "../../lib/components/summon-demon/small-card/small-card.component";
import { CandleCardComponent } from "../../lib/components/summon-demon/candle-card/candle-card.component";
import { EntityCardComponent } from "../../lib/components/summon-demon/entity-card/entity-card.component";

type SmallCardAndCustomArgs = { content?: string } & SmallCardComponent;


const meta: Meta<SmallCardAndCustomArgs> = {
  title: 'SummonDemon/SmallCard',
  component: SmallCardComponent,
  render: ({ content, ...args }) => ({
    props: {
      ...args,
    },
    template: `<lsd-small-card ${argsToTemplate(args)}>${content}</lsd-small-card>`,
    imports: [EntityCardComponent]
  }),
  tags: ['autodocs'],
}

export default meta;


type Story = StoryObj<SmallCardAndCustomArgs>;


export const SmallCard: Story = {
  args: {
    content: `
            <div style="height:15rem;min-width:10rem;background:#F4F7F9; border-radius:0.5rem;"></div>
        `,
  },
}

export const SmallCard2: Story = {
  args: {
    content: `
     <lsd-candle-card
    [cardName]="'Bougie de débutant'"
    [diceNumber]="[6, 5, 4]"
    ></lsd-candle-card>
    `
  },
}

