import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SwipeCharDirective } from '../../../directives/swipe-char.directive';
import { TimerPipe } from '../../../pipes/timer.pipe';

type Value = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Difficulty = 'easy' | 'medium' | 'hard';

enum DifficultyEnum {
  easy = 3,
  medium = 5,
  hard = 7,
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

interface SudokuBlock {
  id: number;
  value: BlockValue;
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
  imports: [NgClass, SwipeCharDirective, TimerPipe],
  styleUrl: './sudoku.component.scss',
  template: ` <div id="sudoku">
    <div id="sudoku-header">
      <h3>sudoku!</h3>
      <p>#{{ difficulty }}</p>
      <button (click)="startGame()">reset</button>
    </div>
    <div id="sudoku-grid">
      @if (sudokuGrid) {
        @if (win) {
          <div class="victory">You Win !</div>
        } @else {
          @for (block of sudokuGrid.blocks; track block.id) {
            <div class="sudoku-block">
              @for (value of block.value; track $index) {
                <div
                  vtSwipeChar
                  [char]="value"
                  [duration]="800"
                  (contextmenu)="caseClick(block.id, $index, $event)"
                  (click)="caseClick(block.id, $index, $event)"
                  [ngClass]="
                    value && reference!.blocks[block.id].value[$index] === value
                      ? 'reference'
                      : 'sudoku-case'
                  "
                ></div>
              }
            </div>
          }
        }
      }
    </div>

    <div id="sudoku-controls">
      @if (sudokuGrid) {
        <div id="header-controls">
          <div>clicks:{{ clickCount }}</div>
          <div>time:{{ time | timer }}</div>
          <div>{{ scoreCount }}/{{ difficultyEnum[difficulty] * 9 }}</div>
        </div>
      }

      <div class="shortcut">click</div>
      <div class="description">increases the value.</div>

      <div class="shortcut">right-click</div>
      <div class="description">decreases the value.</div>

      <div class="shortcut">ctrl+click</div>
      <div class="description">guess case.</div>

      <div class="shortcut">alt+click</div>
      <div class="description">erase case.</div>

      <div class="shortcut">maj+click</div>
      <div class="description">lock case.</div>
    </div>
  </div>`,
})
export class SudokuComponent {
  @Input() sudokuGrid?: SudokuGrid;
  @Input() solution?: SudokuGrid;
  @Input() difficulty: Difficulty = 'easy';
  @Input() reference: SudokuGrid | undefined;
  win: boolean = false;
  clickCount: number = 0;
  difficultyEnum = DifficultyEnum;
  scoreCount: number = 0;
  time: number = 0;
  private crtlPressed: boolean = false;
  private altlPressed: boolean = false;
  private shiftPressed: boolean = false;

  caseClick(blockId: number, caseId: number, event: MouseEvent) {
    if (!this.sudokuGrid) return; // si il n'y a pas de sudoku, on ne fait rien
    this.clickCount++;
    this.time = event.timeStamp;

    switch (event.type) {
      case 'contextmenu':
        event.preventDefault();
        const block = this.sudokuGrid.blocks[blockId];
        if (!block) return;
        let value = block.value[caseId];
        if (value === null) {
          block.value[caseId] = 9;
        } else if (value > 1) {
          block.value[caseId] = (value - 1) as Value;
        } else {
          block.value[caseId] = null;
        }
        break;

      default:
        if (this.crtlPressed) {
          this.toggleGuess(event);
          return;
        }
        if (this.altlPressed) {
          this.eraseCase(blockId, caseId, event);
          return;
        }

        if (this.shiftPressed) {
          this.lockCase(blockId, caseId, event);
          return;
        }

        if (this.sudokuGrid.blocks[blockId]?.value[caseId] === 9) {
          this.sudokuGrid.blocks[blockId].value[caseId] = null;
        } else {
          this.sudokuGrid.blocks[blockId].value[caseId]! += 1;
        }
        break;
    }
    this.countScore()

    if (this.isSudokuSolved()) {
      // si le sudoku est gagné ?
      console.log('🎉 Sudoku gagné !');
      this.sudokuGrid = this.initializeEmptyGrid();
      this.win = true;
    }
  }

  toggleGuess(event: MouseEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('guess')) {
      target.classList.remove('guess');
    } else {
      target.classList.add('guess');
    }
  }

  eraseCase(blockId: number, caseId: number, event: MouseEvent) {
    // si on appuie sur alt
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('guess')) {
      target.classList.remove('guess');
    }
    if (
      this.sudokuGrid &&
      this.sudokuGrid.blocks[blockId].value[caseId] !== null
    ) {
      this.sudokuGrid.blocks[blockId].value[caseId] = null;
    }
  }

  lockCase(blockId: number, caseId: number, event: MouseEvent) {
    if(this.sudokuGrid?.blocks[blockId].value[caseId] === null) return

    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('case-locked')) {
      target.classList.remove('case-locked');
    } else {
      target.classList.add('case-locked');
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
        console.warn(
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

  generateGame(solution: SudokuGrid, difficulty: Difficulty): SudokuGrid {
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
      blocks: Array.from({ length: 9 }, (_, i) => ({
        id: i,
        value: Array.from({ length: 9 }, (_, j) => null),
      })) as [
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
        SudokuBlock,
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

  countScore() { // compte le nombre de cases remplies (pas les corrects, toutes les cases non null)

    let nullGrid: number = 0;
    const nullRef: number = this.difficultyEnum[this.difficulty] * 9
    if(this.sudokuGrid){
      this.sudokuGrid.blocks.forEach((block: SudokuBlock) => {
        // compte les cases vides par block
        nullGrid += block.value.filter((v) => v === null).length;
      })
    } else {
      nullGrid = nullRef
    }
    this.scoreCount =  nullRef - nullGrid;
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


  startGame() {
      this.generateSudoku();
      this.sudokuGrid = this.generateGame(this.solution!, this.difficulty);
      this.reference = JSON.parse(JSON.stringify(this.sudokuGrid));
  }

  ngOnInit(): void {

    if(!this.sudokuGrid){
      this.startGame()
    }
    // gestion du clavier
      document.onkeydown = (event) => {
        if (
          event.key === 'Control' ||
          event.key === 'Alt' ||
          event.key === 'Shift'
        ) {
          switch (event.key) {
            // si on appuie sur ctrl
            case 'Control':
              this.crtlPressed = true;
              break;
            // si on appuie sur alt
            case 'Alt':
              this.altlPressed = true;
              break;

            // si on appuie sur shift
            case 'Shift':
              this.shiftPressed = true;
              const lockedCases:HTMLElement[] = Array.from(
                document.getElementsByClassName('case-locked'),
              ) as HTMLElement[];
              lockedCases.forEach((lockedCase:HTMLElement) => {
                lockedCase.style.pointerEvents = 'inherit';
              });
              break;
          }
        }
      };

      document.onkeyup = (event) => {
        if (
          event.key === 'Control' ||
          event.key === 'Alt' ||
          event.key === 'Shift'
        ) {
          switch (event.key) {
            // si on relâche ctrl
            case 'Control':
              this.crtlPressed = false;
              break;
            // si on relâche alt
            case 'Alt':
              this.altlPressed = false;
              break;

            // si on relâche shift
            case 'Shift':
              this.shiftPressed = false;
              const lockedCases:HTMLElement[] = Array.from(
                document.getElementsByClassName('case-locked'),
              ) as HTMLElement[];
              lockedCases.forEach((lockedCase:HTMLElement) => {
                lockedCase.style.pointerEvents = 'none';
              });
              break;
          }
        }
      };
    
  }
}
