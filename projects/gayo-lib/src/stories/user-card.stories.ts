import { Meta, StoryObj } from "@storybook/angular";
import { UserCardComponent } from "../lib/components/user-card/user-card.component";

const meta:Meta<UserCardComponent> = {
    title: 'FolderApp/UserCard',
    component: UserCardComponent,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<UserCardComponent>;

export const Default: Story = {
    args: {
        userData: {
            username: 'pierre',
            email: 'pierre@pierre.net',
            id: 0,
            avatar_url: 'https://avatars.githubusercontent.com/u/0?v=4',
        }
    },
}

export const colors: Story = {
    args: {
        userData: {
            username: 'Vanessa',
            email: 'vanessa@nasa.com',
            id: 1,
            avatar_url: 'https://thispersondoesnotexist.com/',
        }
    },
}

export const colors2: Story = {
    args: {
        userData: {
            username: 'IgorDu59',
            email: 'IgorDu59@fautdetoutpourfaireunmail.com',
            id: 1,
            avatar_url: 'https://thispersondoesnotexist.com/',
        }
    },
}

