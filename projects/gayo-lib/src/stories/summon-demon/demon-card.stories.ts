import { Meta, StoryObj } from "@storybook/angular";
import { DemonCardComponent } from "../../lib/components/summon-demon";
import { demonCards } from "../../lib/datas/lsd/cards.data";


const meta:Meta<DemonCardComponent> = {
    title: 'SummonDemon/Demon Card',
    component: DemonCardComponent,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<DemonCardComponent>;


export const Default : Story =  {
    args: {
        demon:{
            description: "Le Roi MGB avale ses grosses boules.",
            type: "demon",
            id: 414,
            name: "mgb ultime",
            dices: []
        }
    }
}