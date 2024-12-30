import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

export type BackCardType = 'entity' | 'demon' | 'candle';

@Component({
    selector: 'lsd-back-card',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './back-card.component.html',
    styleUrls: [ './back-card.component.scss']
})

export class BackCardComponent {
    @Input() backCardType: BackCardType = 'entity';
}