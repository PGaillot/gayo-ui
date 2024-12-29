import { Component, Input } from "@angular/core";
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'lsd-demon-card',
    standalone: true,
    imports: [],
    templateUrl: './deamon-card.component.html',
    styleUrls: ['./deamon-card.component.scss', '../entity-card/entity-card.component.scss',]
})

export class DemonCardComponent extends CardComponent {
    @Input() dice: number | undefined;
    
}