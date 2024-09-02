import { Component, Input } from "@angular/core";
import { CardComponent } from "../card/card.component";


@Component({
    selector: 'lsd-entity-card',
    standalone: true,
    imports: [],
    templateUrl: './entity-card.component.html',
    styleUrls: ['./entity-card.component.scss']
})

export class EntityCardComponent extends CardComponent {
    @Input() type!:'girl' | 'boy' | 'animal';
    @Input() diceNumber!: number;
}