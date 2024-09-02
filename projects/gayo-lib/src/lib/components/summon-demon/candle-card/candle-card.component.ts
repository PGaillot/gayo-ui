import { Component, Input } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'lsd-candle-card',
    standalone: true,
    imports: [],
    templateUrl: './candle-card.component.html',
    styleUrls: ['../entity-card/entity-card.component.scss' ]
})


export class CandleCardComponent extends CardComponent { 
    @Input() diceNumber: number[] = [];
}