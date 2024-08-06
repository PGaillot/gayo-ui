import { Meta, StoryObj } from '@storybook/angular';
import { FolderCardComponent } from '../public-api';

const meta: Meta<FolderCardComponent> = {
  title: 'FolderApp/FolderCard',
  component: FolderCardComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<FolderCardComponent>;

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'Histoires',
        content:
          'Histoires laborum maiores mollitia dignissimos dolorum ullam atque. Velit totam explicabo at dignissimos eligendi amet reiciendis, quidem quasi repellendus?',
        id: 0,
      },
      {
        title: 'Secrets',
        content:
          'Secrets molestiae corporis error quas quo sapiente vitae tenetur doloremque sunt suscipit fugit dicta. Perferendis cumque repellendus eaque totam tempore nesciunt nulla reiciendis.',
        id: 1,
      },
      {
        title: 'Paléontologie',
        content:
          'Paléontologie Ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !',
        id: 2,
      },
    ],
  },
};


export const colors: Story = {
  args: {
    ...Default.args,
    colors: ['#f2f7f2', '#d9e6d9', '#c0d6c0', '#a7c5a7', '#8eb58e']
  } 
}