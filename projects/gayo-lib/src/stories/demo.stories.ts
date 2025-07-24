import { Meta, StoryObj } from "@storybook/angular";
import { DemoComponent } from "../lib/components/demo/demo.component";

const meta:Meta = {
    title: "Demo",
    component: DemoComponent
}

export default meta;

type Story = StoryObj<DemoComponent>;

export const Default = {
    args:{
        
    }
}