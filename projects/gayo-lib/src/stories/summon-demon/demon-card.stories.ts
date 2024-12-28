import { Meta, StoryObj } from "@storybook/angular";
import { DemonCardComponent } from "../../lib/components/summon-demon";


const meta:Meta<DemonCardComponent> = {
    title: 'SummonDemon/Demon Card',
    component: DemonCardComponent,
    tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<DemonCardComponent>;


export const Default : Story =  {
    args: {
        dice: 5,
        id:109,
        cardName: "porcus",
        effect:"recoltez 5 âmes."
    }
}