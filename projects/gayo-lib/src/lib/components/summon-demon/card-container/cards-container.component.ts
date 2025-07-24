import { Component, Input } from "@angular/core";
import { CandleCard, DemonCard, EntityCard } from "../../../models/lsd/card.model";
import { NgClass, NgStyle } from "@angular/common";
import { CandleCardComponent, DemonCardComponent, EntityCardComponent } from "gayo-lib";

@Component({
    selector: 'lsd-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrl: './cards-container.component.scss',
    imports: [NgStyle, DemonCardComponent, EntityCardComponent, CandleCardComponent]
})

export class CardsContainerComponent {

    @Input() candle: CandleCard | undefined;
    @Input() demons: DemonCard[] = [];
    @Input() entities: EntityCard[] = [];

    @Input() orientation: 'ver' | 'hor' = 'hor';
}