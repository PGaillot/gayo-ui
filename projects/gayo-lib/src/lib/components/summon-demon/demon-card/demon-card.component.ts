import { Component, Input } from "@angular/core";
import { DemonCard } from "../../../models/lsd/card.model";
import { IdPipe } from "../../../pipes/lsd/id.pipe";

@Component({
    selector: 'lsd-demon-card',
    imports: [IdPipe],
    templateUrl: './demon-card.component.html',
    styleUrls: ['./demon-card.component.scss', '../card/card.component.scss']
})

export class DemonCardComponent {
    @Input() demon!:DemonCard;
}