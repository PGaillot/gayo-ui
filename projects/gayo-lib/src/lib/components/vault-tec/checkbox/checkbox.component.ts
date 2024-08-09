import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [],
  styleUrl: './checkbox.component.scss',
  template: `
    <div
      id="checkbox-container"
      [class.checked]="checked"
      [class.disabled]="disabled"
    >
      <input
        type="checkbox"
        id="checkbox"
        [checked]="checked"
        [disabled]="disabled"
      />
      @if (label) {
        <label for="checkbox" [class.disabled]="disabled">{{ label }}</label>
      }
    </div>
  `,
})
export class CheckboxComponent {
  @Input() label?: string;
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
}
