import { Component, Input } from '@angular/core';

@Component({
  selector: 'vt-slider',
  standalone: true,
  imports: [],
  template: `
    <div id="input-slider">
      <label [for]="id">{{ label }}</label>
      <input type="range" [id]="id" [min]="min" [max]="max" [value]="value" />
    </div>
  `,
  styleUrl: './slider.component.scss',
})

export class SliderComponent {
  @Input() id!: string;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 50;
  @Input() label?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
