import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CandleCardComponent } from '../../lib/components/summon-demon/candle-card/candle-card.component';
import { HoverCardDirective } from '../../lib/directives/hover-card.directive';

@Component({
    selector: 'lsd-hover-card-demo',
    standalone: true,
    styleUrls: ['../../lib/styles/lsd.scss', './story.scss'],
    imports: [CandleCardComponent, HoverCardDirective],
    template: `
        <lsd-candle-card 
            lsdHoverCard 
            [id]="id" 
            [cardName]="cardName" 
            [effect]="effect" 
            [diceNumbers]="diceNumbers">
        </lsd-candle-card>
    `,
})
class HoverCardDirectiveDemo {
    @Input() id: number = 0;
    @Input() cardName!: string;
    @Input() effect!: string;
    @Input() diceNumbers: number[] = [];
}

const meta: Meta<HoverCardDirectiveDemo> = {
    title: 'SummonDemon/Directives/HoverCard',
    component: HoverCardDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [
                CandleCardComponent,
                HoverCardDirective,
                HoverCardDirectiveDemo
            ],
        }),
    ],
    argTypes: {
        id: { control: 'number' },
        cardName: { control: 'text' },
        effect: { control: 'text' },
        diceNumbers: { control: 'object' },
    },
};

export default meta;

type Story = StoryObj<HoverCardDirectiveDemo>;

export const Default: Story = {
    args: {
        id: 12,
        cardName: 'Candle',
        effect: 'Récoltez une Âme.',
        diceNumbers: [5, 6],
    },
};