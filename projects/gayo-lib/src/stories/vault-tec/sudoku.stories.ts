// Component sudoku was generated on Wed Aug 14 2024 18:38:43 GMT+0200 (heure d’été d’Europe centrale)

import { Meta, StoryObj } from '@storybook/angular';
import { SudokuComponent } from '../../lib/components/vault-tec/sudoku/sudoku.component';

const meta: Meta<SudokuComponent> = {
  title: 'Vault-Tec/Sudoku',
  component: SudokuComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SudokuComponent>;

export const SimpleSudoku: Story = {
  args: {
    solution: {
      blocks: [
        {
          id: 0,
          value: [3, 4, 6, 7, 1, 2, 8, 9, 5],
        },
        {
          id: 1,
          value: [7, 9, 8, 4, 6, 5, 1, 3, 2],
        },
        {
          id: 2,
          value: [2, 5, 1, 3, 9, 8, 4, 6, 7],
        },
        {
          id: 3,
          value: [4, 2, 3, 1, 6, 7, 9, 5, 8],
        },
        {
          id: 4,
          value: [6, 7, 9, 5, 8, 4, 2, 1, 3],
        },
        {
          id: 5,
          value: [8, 1, 5, 9, 3, 2, 6, 7, 4],
        },
        {
          id: 6,
          value: [2, 7, 4, 6, 3, 1, 5, 8, 9],
        },
        {
          id: 7,
          value: [9, 5, 6, 8, 4, 7, 3, 2, 1],
        },
        {
          id: 8,
          value: [1, 8, 3, 5, 2, 9, 7, 4, 6],
        },
      ],
    },
    sudokuGrid:{
      "blocks": [
          {
              "id": 0,
              "value": [
                  null,
                  4,
                  6,
                  7,
                  1,
                  2,
                  8,
                  9,
                  5
              ]
          },
          {
              "id": 1,
              "value": [
                  7,
                  9,
                  8,
                  4,
                  6,
                  5,
                  1,
                  3,
                  2
              ]
          },
          {
              "id": 2,
              "value": [
                  2,
                  5,
                  1,
                  3,
                  9,
                  8,
                  4,
                  6,
                  7
              ]
          },
          {
              "id": 3,
              "value": [
                  4,
                  2,
                  3,
                  1,
                  6,
                  7,
                  9,
                  5,
                  8
              ]
          },
          {
              "id": 4,
              "value": [
                  6,
                  7,
                  9,
                  5,
                  8,
                  4,
                  2,
                  1,
                  3
              ]
          },
          {
              "id": 5,
              "value": [
                  8,
                  1,
                  5,
                  9,
                  3,
                  2,
                  6,
                  7,
                  4
              ]
          },
          {
              "id": 6,
              "value": [
                  2,
                  7,
                  4,
                  6,
                  3,
                  1,
                  5,
                  8,
                  9
              ]
          },
          {
              "id": 7,
              "value": [
                  9,
                  5,
                  6,
                  8,
                  4,
                  7,
                  3,
                  2,
                  1
              ]
          },
          {
              "id": 8,
              "value": [
                  1,
                  8,
                  3,
                  5,
                  2,
                  9,
                  7,
                  4,
                  6
              ]
          }
      ]
  }
  },
};

export const EasySudoku: Story = {
  args: {
    difficulty: 'easy',
  },
};

export const MediumSudoku: Story = {
  args: {
    difficulty: 'medium',
  },
};

export const HardSudoku: Story = {
  args: {
    difficulty: 'hard',
  },
};
