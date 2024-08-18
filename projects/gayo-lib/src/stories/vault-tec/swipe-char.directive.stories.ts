import { Component, Input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SwipeCharDirective } from '../../lib/directives/swipe-char.directive';

@Component({
  styleUrls: ['../../lib/styles/vault-tec.scss'],
  standalone: true,
  imports: [ SwipeCharDirective],
  template: ` <p vtSwipeChar [char]="txt"></p> `,
})
export class SwipeCharDirectiveDemo {
  @Input() txt: string = 'S';
}

// --- Stories ---

const meta: Meta<SwipeCharDirectiveDemo> = {
  title: 'VAULT-TEC/Directives/SwipeCharDirective',
  component: SwipeCharDirectiveDemo,
  decorators: [
    moduleMetadata({
      imports: [SwipeCharDirective],
    }),
  ],
  argTypes: {
    txt: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<SwipeCharDirectiveDemo>;

export const Default: Story = {};

