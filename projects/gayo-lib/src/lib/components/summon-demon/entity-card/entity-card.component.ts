import { Component, Input } from "@angular/core";
import { EntityCard } from "../../../models/lsd/card.model";
import { IdPipe } from "../../../pipes/lsd/id.pipe";


@Component({
    selector: 'lsd-entity-card',
    standalone: true,
    imports: [IdPipe],
    templateUrl: './entity-card.component.html',
    styleUrls: ['./entity-card.component.scss', '../card/card.component.scss']
})

export class EntityCardComponent {
    @Input() entity!:EntityCard;
    @Input() size:number = 400;
}