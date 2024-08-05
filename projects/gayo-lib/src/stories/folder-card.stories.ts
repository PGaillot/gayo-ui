import { Meta, StoryObj } from "@storybook/angular";
import { FolderCardComponent } from "../public-api";

const meta:Meta<FolderCardComponent> = {
    title: 'FolderApp/FolderCard',
    component: FolderCardComponent,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<FolderCardComponent>;

export const Default: Story = {
    args: {
        tabs: [
            {
                title: 'Tab 1',
                content: 'laborum maiores mollitia dignissimos dolorum ullam atque. Velit totam explicabo at dignissimos eligendi amet reiciendis, quidem quasi repellendus?'
            },
            {
                title: 'Tab 2',
                content: 'molestiae corporis error quas quo sapiente vitae tenetur doloremque sunt suscipit fugit dicta. Perferendis cumque repellendus eaque totam tempore nesciunt nulla reiciendis. '
            },
            {
                title: 'Tab 3',
                content: 'Ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !'
            }
        ]
    }
}