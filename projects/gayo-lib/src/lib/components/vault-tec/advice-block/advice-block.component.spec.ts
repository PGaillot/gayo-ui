import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceBlockComponent } from './advice-block.component';

describe('AdviceBlockComponent', () => {
  let component: AdviceBlockComponent;
  let fixture: ComponentFixture<AdviceBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdviceBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviceBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
