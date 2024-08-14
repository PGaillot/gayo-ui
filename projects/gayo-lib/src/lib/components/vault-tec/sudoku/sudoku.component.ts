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
  }

  generateSudoku() {
    console.log('Generating sudoku...');

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

    this.generateSudokuBlock();
  }

  generateSudokuBlock() {
    if (!this.sudokuGrid) return;
    // Checker a quel index de block on est.
    this.sudokuGrid.blocks.forEach((block, i) => {
      // i est l'index de du block.
      if (block.value.includes(null)) {
        if (i === 0) {
          this.sudokuGrid!.blocks[i] = this.generateFirstRandomBlock();
        } else {
          // en gros si c'est la premiere ligne de la grille.
          this.sudokuGrid!.blocks[i].value.forEach((value, index) => {
            // index c'est l'index de la case.
            if (index < 3) {
              /// c'est la premiere ligne du bloc.
              this.writeLineBlock(i, index, 0, 3);
            } else if (index < 6) {
              /// c'est la deuxieme ligne du bloc.
              this.writeLineBlock(i, index, 3, 6);
            } else {
              /// c'est la troisieme ligne du bloc.
              this.writeLineBlock(i, index, 6, 9);
            }
          });
        }
      }
    });
  }

  writeLineBlock(
    blockIndex: number,
    caseIndex: number,
    lineStartIndex: number,
    lineEndIndex: number,
  ) {
    const maxAttempts = 20; // Nombre maximum de tentatives pour essayer de trouver une valeur correcte
    let attempts = 0;

    const leftNeighborLineValues: [Value, Value, Value] =
      this.sudokuGrid!.blocks[blockIndex - 1].value.slice(
        lineStartIndex,
        lineEndIndex,
      ) as [Value, Value, Value];

    const secondLeftNeighborLineValues: [Value, Value, Value] =
      blockIndex - 2 >= 0
        ? (this.sudokuGrid!.blocks[blockIndex - 2].value.slice(
            lineStartIndex,
            lineEndIndex,
          ) as [Value, Value, Value])
        : [null, null, null];

    while (this.sudokuGrid!.blocks[blockIndex].value[caseIndex] === null) {
      let random: Value = this.getRandomValue();
      attempts++;

      if (attempts > maxAttempts) {
        console.warn(
          `Impasse détectée, réinitialisation du bloc ${blockIndex} en cours...`,
        );
        this.sudokuGrid!.blocks[blockIndex].value.fill(null); // Réinitialiser le bloc actuel
        this.generateSudokuBlock(); // Recommencer la génération pour le bloc actuel
        return; // Sortir de la fonction pour éviter de continuer après la réinitialisation
      }

      if (
        !this.getTopNeighborLineValues(blockIndex, caseIndex).includes(random) &&
        !leftNeighborLineValues.includes(random) &&
        !secondLeftNeighborLineValues.includes(random) &&
        !this.sudokuGrid!.blocks[blockIndex].value.includes(random)
      ) {
        this.sudokuGrid!.blocks[blockIndex].value[caseIndex] = random;
      }
    }
  }

  getTopNeighborLineValues(
    blockIndex: number,
    caseIndex: number,
  ): [Value, Value, Value, Value, Value, Value] {
    const firstTopNeighborBlock: SudokuBlock | undefined =
      blockIndex - 3 >= 0 ? this.sudokuGrid!.blocks[blockIndex - 3] : undefined;
    const secondTopNeighborBlock: SudokuBlock | undefined =
      blockIndex - 6 >= 0 ? this.sudokuGrid!.blocks[blockIndex - 6] : undefined;
    let indexs: Value[] = [];
    if (firstTopNeighborBlock || secondTopNeighborBlock) {
      let i = caseIndex;
      indexs.push(i as Value);
      while (indexs.length < 3) {
        if (i + 3 > 8) {
          const reste: number = i + 3 - 8;
          indexs.push((reste - 1) as Value);
          i = reste;
        } else {
          i += 3;
          indexs.push(i as Value);
        }
      }
    }

    let firstTopNeighborLineValues: [Value, Value, Value] = [null, null, null];
    let secondTopNeighborLineValues: [Value, Value, Value] = [null, null, null];

    if (firstTopNeighborBlock) {
      firstTopNeighborLineValues = [
        firstTopNeighborBlock!.value.at(indexs[0]!) as Value,
        firstTopNeighborBlock!.value.at(indexs[1]!) as Value,
        firstTopNeighborBlock!.value.at(indexs[2]!) as Value,
      ];
    }

    if (secondTopNeighborBlock) {
      secondTopNeighborLineValues = [
        secondTopNeighborBlock!.value.at(indexs[0]!) as Value,
        secondTopNeighborBlock!.value.at(indexs[1]!) as Value,
        secondTopNeighborBlock!.value.at(indexs[2]!) as Value,
      ];
    }
    return [...firstTopNeighborLineValues, ...secondTopNeighborLineValues];
  }

  getRandomValue(): Value {
    return (Math.floor(Math.random() * 9) + 1) as Value;
  }

  generateFirstRandomBlock(): SudokuBlock {
    let firstBlockValue: Value[] = [];

    while (firstBlockValue.length < 9) {
      const value = this.getRandomValue();
      if (!firstBlockValue.includes(value)) {
        firstBlockValue.push(value);
      }
    }

    return {
      id: 0,
      value: firstBlockValue as BlockValue,
    };
  }

  ngOnInit(): void {
    if (!this.sudokuGrid) {
      this.generateSudoku();
    }
  }
}
