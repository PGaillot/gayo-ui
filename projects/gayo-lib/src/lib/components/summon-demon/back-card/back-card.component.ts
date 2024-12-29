import { Component, Input } from "@angular/core";

export type BackCardType = 'entity' | 'demon' | 'candle';

@Component({
    selector: 'lsd-back-card',
    standalone: true,
    imports: [],
    templateUrl: './back-card.component.html',
    styleUrls: [ './back-card.component.scss']
})

export class BackCardComponent {
    @Input() backCardType: BackCardType = 'entity';
}