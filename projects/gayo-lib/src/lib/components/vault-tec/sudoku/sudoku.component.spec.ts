import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuComponent } from './sudoku.component';

describe('SudokuComponent', () => {
  let component: SudokuComponent;
  let fixture: ComponentFixture<SudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should generate a valid value between 1 and 9', () => {
    const exclude: number[] = [];
    const generatedValue = component.generateCase(exclude);
    expect(generatedValue).toBeGreaterThanOrEqual(1);
    expect(generatedValue).toBeLessThanOrEqual(9);
  });

  it('should generate a value when exclude array is empty', () => {
    const exclude: number[] = [];
    const generatedValue = component.generateCase(exclude);
    expect(generatedValue).toBeDefined();
  });

});
