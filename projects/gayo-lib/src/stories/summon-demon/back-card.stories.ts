import { Meta, StoryObj } from "@storybook/angular";
import { BackCardComponent } from "../../lib/components/summon-demon/back-card/back-card.component";

const meta:Meta<BackCardComponent> = {
    title: 'SummonDemon/Back Card',
    component: BackCardComponent,
    argTypes: {
        backCardType: {
            control: {
                type: 'select',
                options: ['entity', 'demon', 'candle']
            }
        }
    }
}

export default meta;

type Story = StoryObj<BackCardComponent>;

export const Entity:Story = {
    args: {
        backCardType: 'entity'
    }
}
export const Demon:Story = {
    args: {
        backCardType: 'demon'
    }
}
export const Candle:Story = {
    args: {
        backCardType: 'candle'
    }
}