import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'vt-btn',
  standalone: true,
  imports: [NgClass],
  styleUrl: './button.component.scss',
  template: `
    <button
      type="button"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      [ngClass]="classes"
      [style.--color]="color"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color?: string;

  @Input() disabled = false;

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() mouseOver: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @HostListener('mouseover', ['$event'])
  mouseover(event: MouseEvent) {
    this.mouseOver.emit(event);
  }

  public get classes(): string[] {
    return [`vt-btn--${this.size}`];
  }
}
