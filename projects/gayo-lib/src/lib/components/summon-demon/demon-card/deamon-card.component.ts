import { Component } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'lsd-deamon-card',
    standalone: true,
    imports: [],
    templateUrl: './deamon-card.component.html',
    styleUrls: ['./deamon-card.component.scss']
})

export class DemonCardComponent extends CardComponent { }