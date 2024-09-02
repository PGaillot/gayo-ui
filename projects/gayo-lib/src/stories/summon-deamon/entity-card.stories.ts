import { Meta, StoryObj } from "@storybook/angular";
import { EntityCardComponent } from "../../lib/components/summon-demon/entity-card/entity-card.component";

const meta:Meta<EntityCardComponent> = {
    title: 'SummonDemon/EntityCard',
    component: EntityCardComponent,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<EntityCardComponent>;


export const Girl: Story = {
    args: { 
        cardName: 'eve',
        diceNumber: 2,
        type: 'girl',
        effect: 'Récoltez une âme.'
    }
}

export const Boy: Story = {
    args: { 
        cardName: 'roméo',
        diceNumber: 8,
        type: 'boy',
        effect: 'Pour chacune de vos FILLES récoltez une âme.'
    }
}