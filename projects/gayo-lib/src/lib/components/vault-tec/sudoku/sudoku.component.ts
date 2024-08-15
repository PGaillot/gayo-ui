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

    const rowIndex: number = Math.floor(blockId / 3) * 3 + Math.floor(caseId / 3);
    const columnIndex: number = (blockId % 3) * 3 + (caseId % 3);
    // console.log('row :', rowIndex, '/ column :', columnIndex);

    console.log(this.getRow(rowIndex));
    console.log(this.getColumn(columnIndex));
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

    this.sudokuGrid.blocks.forEach((block:SudokuBlock, index) => {
      block.value = this.generateBlockValue(block.value, index);
    })


  }

  generateBlockValue(blockValue: BlockValue, blockIndex: number): BlockValue {
    

    blockValue.forEach((value:Value, index) => {
      const colIndex: number = Math.floor(blockIndex / 3) * 3 + index % 3;
      const rowIndex: number = Math.floor(blockIndex % 3) * 3 + Math.floor(index / 3);

      const containBlockValue:number[] = blockValue.filter((v) => v !== null).map((v) => v as number);
      const containRowValue:number[] = this.getRow(rowIndex).filter((v) => v !== null).map((v) => v as number);
      const containColumnValue:number[] = this.getColumn(colIndex).filter((v) => v !== null).map((v) => v as number);

      const excludeValues:number[] = [...containBlockValue, ...containRowValue, ...containColumnValue];
      console.table(excludeValues);

      // console.log('colIndex :', colIndex, '/ rowIndex :', rowIndex);
      if(value === null) blockValue[index] = this.generateCase(excludeValues);
    })

    console.log('blockValue :');
    console.log(blockValue);
    
    return blockValue

  }


generateCase(exclude: number[]): Value {
   let attempts = 0;
   let random: Value = (Math.floor(Math.random() * 9) + 1) as Value;
   while (exclude.includes(random!)) {
       if (attempts > 20) {
           console.error("⚠️ Too many attempts to find a valid value, resetting...");
           return null;
       }
       random = (Math.floor(Math.random() * 9) + 1) as Value;
       attempts++;
   }
   return random;
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
    if (!this.sudokuGrid) return [null, null, null,null, null, null,null, null, null]
    const blockIndex:number = Math.floor(colIndex / 3);
    const index:number = colIndex % 3
    
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


  ngOnInit(): void {
    if (!this.sudokuGrid) {
      this.generateSudoku();
    }
  }
}
