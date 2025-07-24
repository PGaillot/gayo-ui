import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CandleCard } from "../../../models/lsd/card.model";
import { IdPipe } from "../../../pipes/lsd/id.pipe";

export interface CardEffect {
    title: string;
    description: string;
    hint?: string;
}

@Component({
    selector: 'lsd-candle-card',
    imports: [IdPipe],
    templateUrl: './candle-card.component.html',
    styleUrls: ['./candle-card.component.scss', '../card/card.component.scss']
})


export class CandleCardComponent {
    @Input() candle!: CandleCard;
    @Input() size: number = 400;// la taille de la carte en pixel.

    candleCardEffect: CardEffect = {
        title: `Récoltez une Âme.`,
        description: `LES CIERGES ne peuvent JAMAIS être volés ou défaussés`,
        hint: `vous ne pouvez donc pas les sacrifier pour invoquer un Démon.`
    }
}