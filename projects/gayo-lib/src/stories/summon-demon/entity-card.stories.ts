import { Meta, StoryObj } from "@storybook/angular";
import { EntityCardComponent } from "../../lib/components/summon-demon/entity-card/entity-card.component";
import { EntityCard } from "../../lib/models/lsd/card.model";
import { entityCards } from "../../lib/datas/lsd/cards.data";

const meta:Meta<EntityCardComponent> = {
    title: 'SummonDemon/EntityCard',
    component: EntityCardComponent,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<EntityCardComponent>;

const entityDeck:EntityCard[] = entityCards;

export const Girl: Story = {
    args: {
        entity:entityCards[4]
    }
}

export const Boy: Story = {
    args: {
        entity:entityCards[14]
    }
}

export const Animal: Story = {
    args: {
        entity:entityCards[70]
    }
}