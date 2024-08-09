import { Meta, StoryObj, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { ButtonComponent } from "../../lib/components/vault-tec/button/button.component";

type BtnPropsAndCustomArgs = ButtonComponent & { label?: string };

const meta:Meta<BtnPropsAndCustomArgs> = {
    title:'Vault-Tec/Button',
    component:ButtonComponent,
    tags: ['autodocs'],
    render: ({ label, ...args}) => ({
        props:{
            ...args,
        },
        template: `<vt-btn ${argsToTemplate(args)}>${label}</vt-btn>`,
    })
}

export default meta;

type Story = StoryObj<BtnPropsAndCustomArgs>;

export const SimpleButton:Story = {
    args:{
        label:'Super Test 42',
        size:'medium',
        color:undefined,
    }
}

export const SubcribeButton:Story = {
    args:{
        label:'Subscribe',
    }
}

export const Small:Story = {
    args:{
        label:'Subscribe',
        size:'small',
    }
}

export const Large:Story = {
    args:{
        label:'Subscribe',
        size:'large',
    }
}

export const Disabled:Story = {
    args:{
        label:'Disabled',
        disabled:true,
    }
}