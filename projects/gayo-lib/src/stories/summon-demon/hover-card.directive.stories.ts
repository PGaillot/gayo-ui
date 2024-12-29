import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CandleCardComponent } from '../../lib/components/summon-demon/candle-card/candle-card.component';
import { HoverCardDirective } from '../../lib/directives/hover-card.directive';
import { DemonCardComponent } from '../../lib/components/summon-demon/demon-card/deamon-card.component';

type CardType = 'candle' | 'demon' | 'entity'; // Ajoutez vos types ici

@Component({
    selector: 'lsd-hover-card-demo',
    standalone: true,
    styleUrls: ['../../lib/styles/lsd.scss', './story.scss'],
    imports: [
        CandleCardComponent,
        DemonCardComponent,
        HoverCardDirective
    ],
    template: `
        <div class="demo-container">
            <!-- Candle Card -->

            @switch(cardType){

                @case('candle'){

                    <lsd-candle-card 
                    lsdHoverCard 
                    [id]="id" 
                    [cardName]="cardName" 
                    [effect]="effect" 
                    [diceNumbers]="diceNumbers">
                </lsd-candle-card>
            }
             
            
            @case('demon'){
            <!-- Demon Card -->
            <lsd-demon-card 
            lsdHoverCard
            [id]="id" 
            [cardName]="cardName" 
            [effect]="effect"
            [dice]="dice">
        </lsd-demon-card>
        }
    }
    </div>
    `,
})
class HoverCardDirectiveDemo {
    @Input() id: number = 0;
    @Input() cardName!: string;
    @Input() effect!: string;
    @Input() cardType: CardType = 'candle';

    // Propriétés spécifiques à chaque type de carte
    @Input() diceNumbers: number[] = [];
    @Input() dice: number = 0;
    @Input() soulValue: number = 0;
    @Input() ritualCost: number = 0;
}

const meta: Meta<HoverCardDirectiveDemo> = {
    title: 'SummonDemon/Directives/HoverCard',
    component: HoverCardDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [
                CandleCardComponent,
                DemonCardComponent,
                HoverCardDirective,
                HoverCardDirectiveDemo
            ],
        }),
    ],
    argTypes: {
        cardType: {
            control: 'select',
            options: ['candle', 'demon', 'entity'],
            description: 'Type of card to display'
        },
        id: { control: 'number' },
        cardName: { control: 'text' },
        effect: { control: 'text' },
        diceNumbers: { control: 'object', if: { arg: 'cardType', eq: 'candle' } },
        dice: { control: 'number', if: { arg: 'cardType', eq: 'demon' } },
    },
};

export default meta;

type Story = StoryObj<HoverCardDirectiveDemo>;

// Stories pour chaque type de carte
export const CandleCardStory: Story = {
    args: {
        cardType: 'candle',
        id: 12,
        cardName: 'Candle',
        diceNumbers: [5, 6],
    },
};

export const DemonCardStory: Story = {
    args: {
        cardType: 'demon',
        id: 109,
        cardName: 'porcus',
        effect: 'recoltez 5 âmes.',
        dice: 5,
    },
};