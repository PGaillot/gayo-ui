import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-radio',
  standalone: true,
  imports: [],
  template: `
      <div
      id="radio-container"
      [class.checked]="checked"
      [class.disabled]="disabled"
    >
      <input
        type="radio"
        id="radio"
        [checked]="checked"
        [disabled]="disabled"
      />
      @if (label) {
        <label for="radio" [class.disabled]="disabled">{{ label }}</label>
      }
    </div>
  `,
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() label?: string;
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
}
