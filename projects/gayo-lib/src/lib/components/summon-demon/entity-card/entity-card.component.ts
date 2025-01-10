import { Component, Input } from "@angular/core";
import { EntityCard } from "../../../models/lsd/card.model";


@Component({
    selector: 'lsd-entity-card',
    standalone: true,
    imports: [],
    templateUrl: './entity-card.component.html',
    styleUrls: ['./entity-card.component.scss', '../card/card.component.scss']
})

export class EntityCardComponent {
    @Input() entity!:EntityCard;
}