import { Component, Input } from '@angular/core';

type Value = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface SudokuBlock {
  id: number;
  value: BlockValue;
}

type BlockValue = [
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
  Value,
];

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
    @if (sudokuGrid) {
      @for (block of sudokuGrid.blocks; track block.id) {
        <div class="sudoku-block">
          @for (value of block.value; track $index) {
            <div class="sudoku-case" (click)="onCaseClick(block.id, $index)">
              {{ value }}
            </div>
          }
        </div>
      }
    }
  </div>`,
})
export class SudokuComponent {
  @Input() sudokuGrid?: SudokuGrid;

  constructor() {}

  onCaseClick(blockId: number, caseId: number) {
    if (!this.sudokuGrid) return;

    const value = this.sudokuGrid.blocks[blockId]?.value[caseId] ?? 1;
    if (value === 9) {
      this.sudokuGrid.blocks[blockId].value[caseId] = null;
    } else {
      this.sudokuGrid.blocks[blockId].value[caseId]! += 1;
    }

    const rowIndex: number =
      Math.floor(blockId / 3) * 3 + Math.floor(caseId / 3);
    const columnIndex: number = (blockId % 3) * 3 + (caseId % 3);
    // console.log('row :', rowIndex, '/ column :', columnIndex);

    console.log(this.getRow(rowIndex));
    console.log(this.getColumn(columnIndex));
  }

  generateSudoku() {
    console.log('Generating sudoku...');
    this.initializeEmptyGrid();

    for (let num = 1; num <= 9; num++) {
      console.log(`placement des numéros ${num} ...`);
      let success = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!success && attempts < maxAttempts) {
        success = this.placeNumber(num as Value);
        if (!success) {
          console.log(
            `Échec du placement du numéro ${num}. Tentative ${attempts + 1}`,
          );
          this.removeNumber(num as Value);
          attempts++;
        }
      }

      if (!success) {
        console.error(
          `Impossible de placer le numéro ${num} après ${maxAttempts} tentatives.`,
        );
        this.generateSudoku(); // Recommencer toute la grille
        return;
      }
    }

    console.log('🎊 Sudoku généré avec succès !');

    this.testSudoku()
  }

  initializeEmptyGrid() {
    this.sudokuGrid = {
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
    };
  }

  placeNumber(num: Value): boolean {
    for (let blockIndex = 0; blockIndex < 9; blockIndex++) {
      const block = this.sudokuGrid!.blocks[blockIndex];
      const includingNumRow: boolean[] = [];
      const includingNumCol: boolean[] = [];

      for (let i = 0; i <= 2; i++) {
        const rowIndex: number = Math.floor(blockIndex / 3) * 3 + i;
        const columnIndex: number = (blockIndex % 3) * 3 + (i % 3);
        includingNumRow.push(this.getRow(rowIndex).includes(num));
        includingNumCol.push(this.getColumn(columnIndex).includes(num));
      }

      let positionAvailable: number[] = [];
      for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        if (
          !includingNumRow[row] &&
          !includingNumCol[col] &&
          block.value[i] === null
        ) {
          positionAvailable.push(i);
        }
      }

      if (positionAvailable.length === 0) {
        return false; // Pas de position disponible dans ce bloc
      }

      const position = this.shuffle(positionAvailable)[0];
      block.value[position] = num;
    }

    return true; // Le nombre a été placé avec succès dans tous les blocs
  }

  removeNumber(num: Value) {
    for (let block of this.sudokuGrid!.blocks) {
      const index = block.value.indexOf(num);
      if (index !== -1) {
        block.value[index] = null;
      }
    }
  }

  shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getRow(rowIndex: number): BlockValue {
    let rowValues: Value[] = [];
    const rIndex = (rowIndex % 3) * 3;

    if (rowIndex >= 6 && rowIndex <= 8) {
      for (let blockIndex = 6; blockIndex <= 8; blockIndex++) {
        rowValues = [...rowValues, ...this.getBlockRow(blockIndex, rIndex)];
      }
    } else if (rowIndex >= 3 && rowIndex <= 5) {
      for (let blockIndex = 3; blockIndex <= 5; blockIndex++) {
        rowValues = [...rowValues, ...this.getBlockRow(blockIndex, rIndex)];
      }
    } else {
      for (let blockIndex = 0; blockIndex <= 2; blockIndex++) {
        rowValues = [...rowValues, ...this.getBlockRow(blockIndex, rIndex)];
      }
    }
    return rowValues as BlockValue;
  }

  getColumn(colIndex: number): BlockValue {
    let columnValue: Value[] = [];
    if (!this.sudokuGrid)
      return [null, null, null, null, null, null, null, null, null];
    const blockIndex: number = Math.floor(colIndex / 3);
    const index: number = colIndex % 3;

    for (let i = blockIndex; i <= 8; i += 3) {
      const blockValue: BlockValue = this.sudokuGrid.blocks[i].value;
      for (let bIndex = index; bIndex <= 8; bIndex += 3) {
        columnValue.push(blockValue[bIndex]);
      }
    }
    return columnValue as BlockValue;
  }

  getBlockRow(blockIndex: number, rowStart: number): [Value, Value, Value] {
    if (this.sudokuGrid && this.sudokuGrid.blocks[blockIndex]) {
      const blockValue: BlockValue = this.sudokuGrid.blocks[blockIndex].value;
      return blockValue.slice(rowStart, rowStart + 3) as [Value, Value, Value];
    } else {
      console.error('❌ getBlockRow error:');
      return [null, null, null];
    }
  }

  testBlockValue(blockValue: BlockValue): boolean {
    if (blockValue.includes(null)) return false; // on test la presence de null

    for (let i = 0; i < blockValue.length; i++) { // on test la presence d'une valeur en double ou manquante
      if (blockValue.filter((v) => v === blockValue[i]).length !== 1) {
        return false;
      }  
    }
    return true;
  }

  testSudoku(){

    console.group('🧪 test du sudoku');

    
    console.groupCollapsed('⬇️ test des colones')
    for (let colI = 0; colI <= 8; colI++) {
      console.log(
        `Test de la colonne ${colI} : ${this.testBlockValue(this.getColumn(colI)) ? '✅' : '❌'}`,
      );
    }
    console.groupEnd()

    console.groupCollapsed('➡️ test des rows')
    for (let rowI = 0; rowI <= 8; rowI++) {
      console.log(
        `Test de la row ${rowI} : ${this.testBlockValue(this.getRow(rowI)) ? '✅' : '❌'}`,
      );
    }
    console.groupEnd()

    console.groupCollapsed('📦 test des blocs')
    for (let blockI = 0; blockI <= 8 ; blockI++) {
      console.log(
        `Test du bloc ${blockI} : ${this.testBlockValue(this.sudokuGrid!.blocks[blockI]!.value) ? '✅' : '❌'}`,
      );
    }

    console.groupEnd()
  }

  ngOnInit(): void {
    if (!this.sudokuGrid) {
      this.generateSudoku();
    }
  }
}
