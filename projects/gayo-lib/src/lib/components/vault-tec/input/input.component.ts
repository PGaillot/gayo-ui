import { Component, Input } from '@angular/core';

@Component({
  selector: 'vt-input',
  standalone: true,
  imports: [],
  styleUrl: './input.component.scss',
  template: `
    <div id="input-container">
      @if (label) {
        <label [for]="id">{{ label }}</label>
      }
      <input [type]="inputType" [id]="id" [min]="min" [max]="max" />
    </div>
  `,
})
export class InputComponent {
  @Input() id!: string;
  @Input() label?: string;
  @Input() inputType?: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() min?: number;
  @Input() max?: number;
}
