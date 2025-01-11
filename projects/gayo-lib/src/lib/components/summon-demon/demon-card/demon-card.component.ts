import { Component, Input } from "@angular/core";
import { DemonCard } from "../../../models/lsd/card.model";

@Component({
    selector: 'lsd-demon-card',
    standalone: true,
    imports: [],
    templateUrl: './demon-card.component.html',
    styleUrls: ['./demon-card.component.scss', '../card/card.component.scss']
})

export class DemonCardComponent {
    @Input() demon!:DemonCard;
}