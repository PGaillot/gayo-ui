import { Meta, StoryObj, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { AdviceBlockComponent } from "../../lib/components/vault-tec/advice-block/advice-block.component";



type AdviceBlockCustomArgs = AdviceBlockComponent & { content?: string };

const meta:Meta<AdviceBlockCustomArgs> = {
    title:'Vault-Tec/AdviceBlock',
    component:AdviceBlockComponent,
    tags: ['autodocs'],
    render: ({ content, ...args}) => ({
        props:{
            ...args,
        },
        template: `<vt-advice-block ${argsToTemplate(args)}>${content}</vt-advice-block>`,
    })
}

export default meta;

type Story = StoryObj<AdviceBlockCustomArgs>;

export const SimpleAdviceBlock:Story = {
    args:{
        title:'Super Test 42',
        content:'lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laudantium amet, iusto ducimus qui ea at sequi quisquam nihil incidunt !',
        // size:'medium',
        // color:undefined,
    }
}

// export const SubcribeAdviceBlock:Story = {
//     args:{
//         content:'Subscribe',
//     }
// }

// export const Small:Story = {
//     args:{
//         content:'Subscribe',
//         size:'small',
//     }
// }

// export const Large:Story = {
//     args:{
//         content:'Subscribe',
//         size:'large',
//     }
// }

// export const Disabled:Story = {
//     args:{
//         content:'Disabled',
//         disabled:true,
//     }
// }