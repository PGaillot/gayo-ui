import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PerkCharPipe } from '../../../pipes/perk-char.pipe';

@Component({
  selector: 'vt-perk-counter',
  standalone: true,
  imports: [PerkCharPipe],
  styleUrl: './perk-counter.component.scss',
  template: `


  <div #perkCounter id="perk-counter">
    <span (mousedown)="startCounter($event)" (mouseup)="stopCounter($event)" class="counter-button" id="btn-up" (click)="countUp()">+</span>
    <div id="counter">
      {{ perkName | perkChar }}
      <span id="counter-value">{{ count }}</span>
    </div>
    <span (mousedown)="startCounter($event)" (mouseup)="stopCounter($event)" class="counter-button" id="btn-down" (click)="countDown()">-</span>
  </div>

  `,
})
export class PerkCounterComponent {
  @ViewChild('perkCounter') perkCounterRef!: ElementRef;

  @Input() perkName!: string;
  @Input() max: number = 100;
  min: number = 0;
  count: number = 0;
  countInerval: any;

  startCounter(event: MouseEvent) {

    const target: HTMLElement = event.target as HTMLElement;
    console.log(target);
    
    this.countInerval = setInterval(() => {
      
      if(target.id === 'btn-up') {
        this.countUp();
      } else if(target.id === 'btn-down') {
        this.countDown();
      } else {
        return
      }

      this.countDown();
    }, 50);
    

  }

  stopCounter(event: MouseEvent) {
    if (this.countInerval) {
      clearInterval(this.countInerval);
    }
  }

  countUp() {
    if (this.count < this.max) {
      this.count++;
    } else {
      this.wizzError();
    }
  }

  countDown() {
    if (this.count > this.min) {
      this.count--;
    } else {
      this.wizzError();
    }
  }

  wizzError(){
    console.log('wizzError')
    this.perkCounterRef.nativeElement.classList.add('wizz-error');
    setTimeout(() => {
      this.perkCounterRef.nativeElement.classList.remove('wizz-error');
    }, 500)
  }
}
