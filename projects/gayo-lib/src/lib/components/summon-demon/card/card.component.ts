import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() id:number = 0;
  @Input() cardName!:string;
  @Input() effect!:string;

  constructor() {}
  

}
