import { Component, Input } from "@angular/core";
import { DemonCard } from "../../../models/lsd/card.model";

@Component({
    selector: 'lsd-demon-card',
    standalone: true,
    imports: [],
    templateUrl: './deamon-card.component.html',
    styleUrls: ['./deamon-card.component.scss', '../card/card.component.scss']
})

export class DemonCardComponent {
    @Input() demon!:DemonCard;
}