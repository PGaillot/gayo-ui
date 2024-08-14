
// Component sudoku was generated on Wed Aug 14 2024 18:38:43 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from "@storybook/angular";
import { SudokuComponent } from "../../lib/components/vault-tec/sudoku/sudoku.component";


const meta:Meta<SudokuComponent> = {
  title:'Vault-Tec/Sudoku',
  component:SudokuComponent,
  tags: ['autodocs'],
}

export default meta;

type Story = StoryObj<SudokuComponent>;

export const SimpleSudoku:Story = {
  args:{
      // vos arguments ici
  }
}
    