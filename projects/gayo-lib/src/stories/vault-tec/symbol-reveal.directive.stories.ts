import { Component } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { SymbolRevealDirective } from "../../lib/directives/symbol-reveal.directive";

@Component({
    template: `
    <p vtSymbolReveal >superTest&#64;gmail.com</p>`,
    styleUrls: ['../../lib/styles/vault-tec.scss']
})

class SymbolRevealDirectiveDemo {
}


// --- Stories ---


const meta: Meta<SymbolRevealDirectiveDemo> = {
    title: 'VAULT-TEC/Directives/SymbolReveal',
    component: SymbolRevealDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [SymbolRevealDirective],
        }),
    ],
    argTypes: {
        txt: { control: 'text' },
    },
};


export default meta;

type Story = StoryObj<SymbolRevealDirectiveDemo>;


export const Default: Story = {}