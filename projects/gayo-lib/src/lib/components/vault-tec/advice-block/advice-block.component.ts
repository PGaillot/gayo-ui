import { Component, Input } from '@angular/core';

@Component({
    selector: 'vt-advice-block',
    imports: [],
    styleUrl: './advice-block.component.scss',
    template: `
    <span id="advice-block">
      <div id="title">{{ title }}</div>
      <ng-content></ng-content>
    </span>
  `
})
export class AdviceBlockComponent {
  @Input() title?: string = 'Advice';
}
