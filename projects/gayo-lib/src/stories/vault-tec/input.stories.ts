
// Component input was generated on Sat Aug 10 2024 11:11:14 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from "@storybook/angular";
import { InputComponent } from "../../lib/components/vault-tec/input/input.component";


const meta:Meta<InputComponent> = {
  title:'Vault-Tec/Input',
  component:InputComponent,
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<InputComponent>;

export const SimpleInput:Story = {
  args:{
      id:'default',
      label:'Entrez un texte',
      inputType:'text',
  }
}
    