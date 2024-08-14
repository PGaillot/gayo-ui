import { Component } from '@angular/core';

type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface SudokuBlock {
  id: number;
  value: [Value, Value, Value, Value, Value, Value, Value, Value, Value];
}

interface SudokuGrid {
  blocks: [
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
    SudokuBlock,
  ];
}

@Component({
  selector: 'vt-sudoku',
  standalone: true,
  imports: [],
  styleUrl: './sudoku.component.scss',
  template: `<div id="sudoku-grid">
    @for (block of sudokuGrid.blocks; track block.id) {
      <div class="sudoku-block">
        @for (value of block.value; track $index) {
          <div class="sudoku-case">
            {{ value }}
          </div>
        }
      </div>
    }
  </div>`,
})
export class SudokuComponent {
  sudokuGrid: SudokuGrid = {
    blocks: [
      {
        id: 0,
        value: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 1,
        value: [2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
      {
        id: 2,
        value: [3, 3, 3, 3, 3, 3, 3, 3, 3],
      },
      {
        id: 3,
        value: [4, 4, 4, 4, 4, 4, 4, 4, 4],
      },
      {
        id: 4,
        value: [5, 5, 5, 5, 5, 5, 5, 5, 5],
      },
      {
        id: 5,
        value: [6, 6, 6, 6, 6, 6, 6, 6, 6],
      },
      {
        id: 6,
        value: [7, 7, 7, 7, 7, 7, 7, 7, 7],
      },
      {
        id: 7,
        value: [8, 8, 8, 8, 8, 8, 8, 8, 8],
      },
      {
        id: 8,
        value: [9, 9, 9, 9, 9, 9, 9, 9, 9],
      },
    ],
  };
}
