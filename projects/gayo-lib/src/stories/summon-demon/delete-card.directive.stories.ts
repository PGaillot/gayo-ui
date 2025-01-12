import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CandleCardComponent } from '../../lib/components/summon-demon/candle-card/candle-card.component';
import { DeleteCardDirective } from '../../lib/directives/delete-card.directive';
import { CardType } from '../../lib/models/lsd/card.model';
import { candleCards, demonCards, entityCards } from '../../lib/datas/lsd/cards.data';
import { EntityCardComponent , DemonCardComponent} from '../../public-api';

@Component({
    selector: 'lsd-delete-card-demo',
    standalone: true,
    styleUrls: ['../../lib/styles/lsd.scss', './story.scss'],
    imports: [CandleCardComponent,DemonCardComponent, EntityCardComponent, DeleteCardDirective],
    template: `

        @switch(cardType){
            @case('candle'){
                <lsd-candle-card 
                    lsdDeleteCard 
                    [candle]="card">
                </lsd-candle-card>
            }
            @case('demon'){
                <lsd-demon-card 
                    lsdDeleteCard 
                    [demon]="card">
                </lsd-demon-card>
            }
            @case('entity'){
                <lsd-entity-card 
                    lsdDeleteCard 
                    [entity]="card">
                </lsd-entity-card>
            }
        }

    `,
})


class DeleteCardDirectiveDemo {
    @Input() cardType!: 'candle' | 'demon' | 'entity';
    @Input() card!: CardType;
}

//----------------------------------

const meta: Meta<DeleteCardDirectiveDemo> = {
    title: 'SummonDemon/Directives/DeleteCard',
    component: DeleteCardDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [
                CandleCardComponent,
                DemonCardComponent, 
                EntityCardComponent,
                DeleteCardDirective,
                DeleteCardDirectiveDemo
            ],
        }),
    ],
    argTypes: {
        card: { control: 'number' },
    },
};

export default meta;

type Story = StoryObj<DeleteCardDirectiveDemo>;

export const Candle: Story = {
    args: {
        cardType:'candle',
        card: candleCards[0]
    },
};

export const Entity: Story = {
    args: {
        cardType:'entity',
        card: entityCards[0]
    },
};

export const Demon: Story = {
    args: {
        cardType:'demon',
        card: demonCards[0]
    },
};