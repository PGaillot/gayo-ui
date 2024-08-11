import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
import { ButtonComponent } from '../../lib/components/vault-tec/button/button.component';

type BtnPropsAndCustomArgs = ButtonComponent & { label?: string };

const meta: Meta<BtnPropsAndCustomArgs> = {
  title: 'Vault-Tec/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  render: ({ label, ...args }) => ({
    props: {
      ...args,
    },
    template: `<vt-btn ${argsToTemplate(args)}>${label}</vt-btn>`,
  }),
};

export default meta;

type Story = StoryObj<BtnPropsAndCustomArgs>;

export const Demo: Story = {
  args: {
    size:'small'
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
       <div style="display: flex; flex-direction: column; flex-wrap: wrap;  gap: 16px; font-family: Monospace; color: #2dc92d">

            <h2>Je veux en savoir plus</h2>
            lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !

            <div style="display: flex; flex-direction: row; flex-wrap: wrap;  gap: 16px; font-family: Monospace; color: #2dc92d">
            <vt-btn ${argsToTemplate(args)}>Je veux en savoir plus</vt-btn>
           <vt-btn ${argsToTemplate(args)} [stroke]="true">continuer</vt-btn>
            </div>
        </div>
    `,
  }),
};

export const SimpleButton: Story = {
  args: {
    label: 'S.P.E.C.I.A.L',
    size: 'medium',
  },
};

export const SubcribeButton: Story = {
  args: {
    label: 'Subscribe',
  },
};

export const Small: Story = {
  args: {
    label: 'Subscribe',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Subscribe',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    loading: true,
  },
};
