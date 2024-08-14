
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
      sudokuGrid: {
        blocks: [
          {
            id: 0,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 1,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 2,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 3,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 4,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 5,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 6,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 7,
            value: [null, null, null, null, null, null, null, null, null],
          },
          {
            id: 8,
            value: [null, null, null, null, null, null, null, null, null],
          },
        ],
      }
  }
}
    

export const EmptySudoku:Story = {
  args:{
      sudokuGrid: undefined
  }
}