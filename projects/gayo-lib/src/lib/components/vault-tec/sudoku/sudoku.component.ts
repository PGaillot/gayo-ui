import { NgClass } from '@angular/common';
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

type Difficulty = 'easy' | 'medium' | 'hard';

@Component({
  selector: 'vt-sudoku',
  standalone: true,
  imports: [NgClass],
  styleUrl: './sudoku.component.scss',
  template: `<div id="sudoku-grid">
    @if (sudokuGrid) {
      @if (win) {
        <div class="victory">You Win !</div>
      } @else {
        @for (block of sudokuGrid.blocks; track block.id) {
          <div class="sudoku-block">
            @for (value of block.value; track $index) {
              <div (click)="onCaseClick(block.id, $index, $event)" [ngClass]="value && reference!.blocks[block.id].value[$index] === value ? 'reference' : 'sudoku-case'">
                {{ value }}
              </div>
            }
          </div>
        }
      }
    }
  </div>`,
})
export class SudokuComponent {
  @Input() sudokuGrid?: SudokuGrid;
  reference: SudokuGrid | undefined;
  @Input() solution?: SudokuGrid;
  @Input() difficulty: Difficulty = 'easy';
  win: boolean = false;
  crtlPressed: boolean = false;

  onCaseClick(blockId: number, caseId: number, event:MouseEvent) {
    if (!this.sudokuGrid) return; // si il n'y a pas de sudoku, on ne fait rien

    if(this.crtlPressed) {  // si on appuie sur ctrl
      const target: HTMLElement = event.target as HTMLElement;
      if(target.classList.contains('guess')) {
        target.classList.remove('guess');
        return
      }else {
        target.classList.add('guess');
      }
      return
    }

    const value = this.sudokuGrid.blocks[blockId]?.value[caseId] ?? 1; // on récupère la valeur du bloc
    if (value === 9) {
      this.sudokuGrid.blocks[blockId].value[caseId] = null;
    } else {
      this.sudokuGrid.blocks[blockId].value[caseId]! += 1;
    }


    if (this.isSudokuSolved()) { // si le sudoku est gagné ?
      console.log('🎉 Sudoku gagné !');
      this.sudokuGrid = this.initializeEmptyGrid();
      this.win = true;
    }
  }

  generateSudoku() {
    console.log('Generating sudoku...');
    this.solution = this.initializeEmptyGrid();

    for (let num = 1; num <= 9; num++) {
      // console.log(`placement des numéros ${num} ...`);
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
    console.log('Soluce :', this.solution);
    this.testSudoku();
  }

  generateGame(
    solution: SudokuGrid,
    difficulty: Difficulty,
  ): SudokuGrid {

    let d: number = 3;
    switch (difficulty) {
      case 'medium':
        d = 5;
        break;
      case 'hard':
        d = 7;
        break;
      default:
        d = 3;
        break;
    }

    let gameGrid: SudokuGrid = JSON.parse(JSON.stringify(solution));
    gameGrid.blocks.forEach((block) => {
      for (let i = 0; i <= d - 1; i++) {
        let index: number = Math.floor(Math.random() * 9);
        index = Math.floor(Math.random() * 9);
        if (block.value[index] != null) {
          block.value[index] = null;
        } else {
          i--;
        }
      }
    });
    return gameGrid;
  }

  initializeEmptyGrid(): SudokuGrid {
    return {
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
      const block = this.solution!.blocks[blockIndex];
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
    for (let block of this.solution!.blocks) {
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
    if (!this.solution)
      return [null, null, null, null, null, null, null, null, null];
    const blockIndex: number = Math.floor(colIndex / 3);
    const index: number = colIndex % 3;

    for (let i = blockIndex; i <= 8; i += 3) {
      const blockValue: BlockValue = this.solution.blocks[i].value;
      for (let bIndex = index; bIndex <= 8; bIndex += 3) {
        columnValue.push(blockValue[bIndex]);
      }
    }
    return columnValue as BlockValue;
  }

  getBlockRow(blockIndex: number, rowStart: number): [Value, Value, Value] {
    if (this.solution && this.solution.blocks[blockIndex]) {
      const blockValue: BlockValue = this.solution.blocks[blockIndex].value;
      return blockValue.slice(rowStart, rowStart + 3) as [Value, Value, Value];
    } else {
      console.error('❌ getBlockRow error:');
      return [null, null, null];
    }
  }

  isSudokuSolved(): boolean {
    if (!this.sudokuGrid || !this.solution) {
      return false;
    }

    for (let i = 0; i < this.sudokuGrid.blocks.length; i++) {
      const block: SudokuBlock = this.sudokuGrid.blocks[i];
      if (block.value.includes(null)) {
        return false;
      }

      for (let valueIndex = 0; valueIndex < block.value.length; valueIndex++) {
        const value = block.value[valueIndex];
        if (value !== this.solution!.blocks[i].value[valueIndex]) {
          return false;
        }
      }
    }

    return true;
  }

  testBlockValue(blockValue: BlockValue): boolean {
    if (blockValue.includes(null)) return false; // on test la presence de null

    for (let i = 0; i < blockValue.length; i++) {
      // on test la presence d'une valeur en double ou manquante
      if (blockValue.filter((v) => v === blockValue[i]).length !== 1) {
        return false;
      }
    }
    return true;
  }

  testSudoku() {
    console.group('🧪 test du sudoku');
    console.groupCollapsed('⬇️ test des colones');
    for (let colI = 0; colI <= 8; colI++) {
      console.log(
        `Test de la colonne ${colI} : ${this.testBlockValue(this.getColumn(colI)) ? '✅' : '❌'}`,
      );
    }
    console.groupEnd();
    console.groupCollapsed('➡️ test des rows');
    for (let rowI = 0; rowI <= 8; rowI++) {
      console.log(
        `Test de la row ${rowI} : ${this.testBlockValue(this.getRow(rowI)) ? '✅' : '❌'}`,
      );
    }
    console.groupEnd();
    console.groupCollapsed('📦 test des blocs');
    for (let blockI = 0; blockI <= 8; blockI++) {
      console.log(
        `Test du bloc ${blockI} : ${this.testBlockValue(this.solution!.blocks[blockI]!.value) ? '✅' : '❌'}`,
      );
    }
    console.groupEnd();
  }

  ngOnInit(): void {
    if (!this.sudokuGrid) {
      this.generateSudoku();
      this.sudokuGrid = this.generateGame(this.solution!, this.difficulty);
      this.reference = JSON.parse(JSON.stringify(this.sudokuGrid));
    }

    document.onkeydown = (event) => { // si on appuie sur ctrl
      if (event.key === 'Control') { 
        this.crtlPressed = true;
      }
    };

    document.onkeyup = (event) => { // si on relâche sur ctrl
      if (event.key === 'Control') { 
        this.crtlPressed = false;
      }
    };
  }
}
