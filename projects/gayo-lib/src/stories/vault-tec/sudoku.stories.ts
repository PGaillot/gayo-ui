
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
            value: [1, null, null, null, null, null, null, null, null],
          },
          {
            id: 1,
            value: [8, null, null, 5, 9, null, null, null, 2],
          },
          {
            id: 2,
            value: [null, 4, null, null, null, null, 6, null, null],
          },
          {
            id: 3,
            value: [null, 2, null, 1, null, null, 6, null, null],
          },
          {
            id: 4,
            value: [6, null, null, null, null, 8, null, null, 4],
          },
          {
            id: 5,
            value: [null, null, 5, null, null, null, 2, null, 4],
          },
          {
            id: 6,
            value: [2, null, null, null, null, null, 9, null, null],
          },
          {
            id: 7,
            value: [null, 1, null, null, null, null, null, null, null],
          },
          {
            id: 8,
            value: [null, null, null, 3, null, null, null, null, null],
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