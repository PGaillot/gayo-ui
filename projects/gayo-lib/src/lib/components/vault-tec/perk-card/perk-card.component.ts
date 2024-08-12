import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PerksType } from '../../../services/perks.service';

type FaceType = 'front' | 'back';

@Component({
  selector: 'vt-perk-card',
  standalone: true,
  imports: [NgClass],
  styleUrl: './perk-card.component.scss',
  template: `
    <div id="perk-block" [style.--flip-duration.ms]="flipDuration">
      <div #card class="perk-card">

        @if (face === 'front') {
          <div class="front-card " (click)="flipCard('front')">
            <svg [ngClass]="perkName + '-perk'"></svg>
            <span>{{ perkName.slice(0, 1) }}</span>
          </div>
        } @else {
          <div class="back-card" (click)="flipCard('back')">
            <h3 class="perk-name">{{ perkName }}</h3>
            <div class="divider"></div>
            <p class="description">{{ description }}</p>
          </div>
        }

      </div>
    </div>
  `,
})
export class PerkCardComponent {
  @ViewChild('card', { static: true }) cardRef!: ElementRef;

  @Input() description!: string;
  @Input() perkName!: PerksType ;
  @Input() face:FaceType = 'front';
  @Input() flipDuration = 500;

  flipCard(from: 'front' | 'back'): void {
    const cardElement = this.cardRef.nativeElement;
    cardElement.classList.toggle('flip');

    setTimeout(() => {
      cardElement.classList.toggle('flip');
    }, this.flipDuration);

    setTimeout(() => {
      this.face = from === 'front' ? 'back' : 'front';
    }, this.flipDuration / 2);
  }
}
