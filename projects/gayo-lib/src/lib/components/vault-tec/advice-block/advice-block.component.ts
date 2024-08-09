import { Component, Input } from '@angular/core';

@Component({
  selector: 'vt-advice-block',
  standalone: true,
  imports: [],
  styleUrl: './advice-block.component.scss',
  template: `
    <p id="advice-block" [style.--title]="title">
      <ng-content></ng-content>
    </p>
  `,
})
export class AdviceBlockComponent {
  @Input() title?: string;
}
