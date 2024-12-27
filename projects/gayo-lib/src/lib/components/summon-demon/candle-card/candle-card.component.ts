import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CardComponent } from "../card/card.component";

export interface CardEffect {
    title: string;
    description: string;
    hint?: string;
}

@Component({
    selector: 'lsd-candle-card',
    standalone: true,
    imports: [],
    templateUrl: './candle-card.component.html',
    styleUrls: ['../entity-card/entity-card.component.scss', './candle-card.component.scss']
})


export class CandleCardComponent extends CardComponent {
    @Input() diceNumbers: number[] = [];

    candleCardEffect: CardEffect = {
        title: `Récoltez une Âme.`,
        description: `LES CIERGES ne peuvent JAMAIS être volés ou défaussés`,
        hint: `vous ne pouvez donc pas les sacrifier pour invoquer un Démon.`
    }

    ngOnInit(): void {

    }
}