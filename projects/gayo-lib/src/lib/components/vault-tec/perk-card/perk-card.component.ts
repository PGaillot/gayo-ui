import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
const animDuration: number = 300;

@Component({
  selector: 'vt-perk-card',
  standalone: true,
  imports: [NgClass],
  styleUrl: './perk-card.component.scss',
  template: `
    <div id="perk-block">
      <div
        class="perk-card"
        [ngClass]="face === 'front' ? 'card-hidden' : 'card-reveal'"
        [style.--perk]="perkName"
      >
        <!--  -->

        @if (face === 'front') {
          <div class="front-card " (click)="face = 'back'">
            <svg></svg>
            <span>{{ perkName.slice(0, 1) }}</span>
          </div>
        } @else {
          <div class="back-card" (click)="face = 'front'">
            <span class="perk-name">{{ perkName }}</span>
            <div class="divider"></div>
            <p>{{ content }}</p>
          </div>
        }

        <!--  -->
      </div>
    </div>
  `,
})
export class PerkCardComponent {
  @Input() content!: string;
  @Input() perkName:
  | 'strength'
  | 'perception'
  | 'endurance'
  | 'charisma'
  | 'intelligence'
  | 'agility'
  | 'luck' = 'strength';
  face: 'front' | 'back' = 'front';
  
  getPerkIcon(perkName: string) {
    return `url('../../../../assets/special/${perkName}.svg')`;
  }
}
