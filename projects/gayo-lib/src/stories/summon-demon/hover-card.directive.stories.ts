import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CandleCardComponent } from '../../lib/components/summon-demon/candle-card/candle-card.component';
import { HoverCardDirective } from '../../lib/directives/hover-card.directive';
import { DemonCardComponent } from '../../lib/components/summon-demon/demon-card/demon-card.component';
import { BackCardComponent, BackCardType } from '../../lib/components/summon-demon/back-card/back-card.component';
import { CandleCard, DemonCard, EntityCard } from '../../lib/models/lsd/card.model';
import { candleCards, demonCards, entityCards } from '../../lib/datas/lsd/cards.data';
import { EntityCardComponent } from '../../lib/components/summon-demon/entity-card/entity-card.component';

type Card = CandleCard | DemonCard | EntityCard | BackCardType; // Ajoutez vos types ici
type CardType = 'candle' | 'demon' | 'entity' | 'back-card';

@Component({
    selector: 'lsd-hover-card-demo',
    standalone: true,
    styleUrls: ['../../lib/styles/lsd.scss', './story.scss'],
    imports: [
        CandleCardComponent,
        DemonCardComponent,
        EntityCardComponent,
        HoverCardDirective,
        BackCardComponent,
    ],
    template: `
        <div class="demo-container">
            <!-- Candle Card -->

            @switch(cardType){

            @case('candle'){
                <lsd-candle-card 
                lsdHoverCard 
                [candle]="card"
                >
            </lsd-candle-card>
            }
             
            @case('demon'){
            <!-- Demon Card -->
            <lsd-demon-card 
            lsdHoverCard
            [demon]="card">
            </lsd-demon-card>
            }
             
            @case('entity'){
            <!-- Demon Card -->
            <lsd-entity-card 
            lsdHoverCard
            [entity]="card">
            </lsd-entity-card>
            }
      
            @case('back-card'){
            <!-- Back Card -->
            <lsd-back-card 
            lsdHoverCard
            [backCardType]="card">
            </lsd-back-card>
            }
    }
    </div>
    `,
})
class HoverCardDirectiveDemo {
    @Input() card: Card = candleCards[0];
    @Input() cardType!:CardType;
}

const meta: Meta<HoverCardDirectiveDemo> = {
    title: 'SummonDemon/Directives/HoverCard',
    component: HoverCardDirectiveDemo,
    decorators: [
        moduleMetadata({
            imports: [
                CandleCardComponent,
                DemonCardComponent,
                BackCardComponent,
                EntityCardComponent,
                HoverCardDirective,
                HoverCardDirectiveDemo
            ],
        }),
    ],
    argTypes: {
        card: {
            control: 'select',
            options: ['candle', 'demon', 'entity', 'back-entity'],
            description: 'Type of card to display'
        },
    },
};

export default meta;

type Story = StoryObj<HoverCardDirectiveDemo>;

// Stories pour chaque type de carte
export const CandleCardStory: Story = {
    args: {
        cardType:'candle',
        card:candleCards[0] 
    },
};

export const DemonCardStory: Story = {
    args: {
        cardType:'demon',
        card: {
            id:414,
            name:'roi mangeboule',
            type: 'demon',
            dices: [4],
            description:' Les MANGEBOULLES récoltent 2 Âmes.'
        }
    },
};

export const EntityCardStory:Story = {
    args:{
        cardType:'entity',
        card: {
            id:414,
            name:'roi mangeboule',
            type: 'demon',
            dices: [4],
            description:' Tout les MGB récoltent 2 Âmes.'
        }
    }
}

export const BackCardStory: Story = {
    args: {
        cardType:'back-card',
        card: 'candle',
    },
};