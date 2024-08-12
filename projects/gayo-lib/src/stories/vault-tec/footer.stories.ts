// Component footer was generated on Sun Aug 11 2024 23:14:21 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from '../../lib/components/vault-tec/footer/footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Vault-Tec/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<FooterComponent>;

export const SimpleFooter: Story = {
  args: {
    footerElements: [
      {
        title: 'Section 1',
        pages: [
          {
            title: 'Page 1',
            url: '/',
          },
          {
            title: 'Page 2',
            url: '/',
          },
          {
            title: 'Page 3',
            url: '/',
          },
          {
            title: 'Page 4',
            url: '/',
          },
        ],
      },
      {
        title: 'Section 2',
        pages: [
          {
            title: 'Page 1',
            url: '/',
          },
          {
            title: 'Page 2',
            url: '/',
          },
          {
            title: 'Page 3',
            url: '/',
          },
        ],
      },
    ],
    contactFooterElement: {
      username: 'username',
      email: 'email@example.com',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      npmUrl: 'https://npm.com',
    },
  },
};
