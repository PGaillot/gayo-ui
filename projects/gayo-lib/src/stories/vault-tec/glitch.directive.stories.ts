import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { GlitchDirective } from '../../lib/directives/glitch.directive';

@Component({
  styleUrls:['../../lib/styles/vault-tec.scss', './story.scss'],
  template: `
    <div vtGlitch
      [duration]="duration"
      [delay]="delay"
      style="display: flex; flex-direction: column; align-items: center; width: 300px;">
      <svg class="vautl-boy"></svg>
      <p style="margin: 0; border: 3px solid #2dc92d; padding: 12px;">
        {{ text }}
      </p>
    </div>
  `,
})

class GlitchDirectiveDemo {
  @Input() text = 'Ceci est un texte avec effet de glitch';
  @Input() duration = 8;
  @Input() delay: number | null = null;
}

// --- Stories ---

const meta: Meta<GlitchDirectiveDemo> = {
  title: 'VAULT-TEC/Directives/Glitch',
  component: GlitchDirectiveDemo,
  decorators: [
    moduleMetadata({
      imports: [GlitchDirective],
    }),
  ],
  argTypes: {
    duration: { control: { type: 'number', min: 1.5 } },
    delay: { control: { type: 'number', min: 1000 } },
    text: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<GlitchDirectiveDemo>;

export const Default: Story = {
  args: {
    duration: 6,
    delay: null,
    text: 'Ceci est un texte avec effet de glitch',
  },
};

export const WithDelay: Story = {
  args: {
    ...Default.args,
    delay: 6000,
  },
};
