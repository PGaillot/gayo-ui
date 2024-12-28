import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CandleCardComponent } from '../../lib/components/summon-demon/candle-card/candle-card.component';
import { DeleteCardDirective } from '../../lib/directives/delete-card.directive';

@Component({
    selector: 'lsd-delete-card-demo',
    standalone: true,
    styleUrls: ['../../lib/styles/lsd.scss', './story.scss'],
    imports: [CandleCardComponent, DeleteCardDirective],
    template: `
        <lsd-candle-card 
            lsdDeleteCard 
            [id]="id" 
            [cardName]="cardName" 
            [effect]="effect" 
            [diceNumbers]="diceNumbers">
        </lsd-candle-card>
    `,
})
class DeleteCardDirectiveDemo {
    @Input() id: number = 0;
    @Input() cardName!: string;
    @Input() effect!: string;
    @Input() diceNumbers: number[] = [];
}

const meta: Meta<DeleteCardDirectiveDemo> = {
    title: 'SummonDemon/Directives/DeleteCard',
    component: DeleteCardDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [
                CandleCardComponent,
                DeleteCardDirective,
                DeleteCardDirectiveDemo
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

type Story = StoryObj<DeleteCardDirectiveDemo>;

export const Default: Story = {
    args: {
        id: 12,
        cardName: 'Candle',
        effect: 'Récoltez une Âme.',
        diceNumbers: [5, 6],
    },
};