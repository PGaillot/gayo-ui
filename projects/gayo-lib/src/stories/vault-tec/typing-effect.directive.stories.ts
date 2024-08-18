import { Component } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { TypingEffetDirective } from "../../lib/directives/typing-effet.directive";


@Component({
    template: `
        <p vtTypingEffet class="text-3xl font-bold underline">Hello world! i'm typing effect</p>
    `,  
    styleUrls: ['../../lib/styles/vault-tec.scss']
})

class TypingEffectDirectiveDemo {}


//  --- Stories ---


const meta:Meta<TypingEffectDirectiveDemo> = {
    title: 'VAULT-TEC/Directives/TypingEffectDirective',
    component: TypingEffectDirectiveDemo,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [TypingEffetDirective],
        }),
    ]
};

export default meta;
type Story = StoryObj<TypingEffectDirectiveDemo>
export const Default: Story = {};