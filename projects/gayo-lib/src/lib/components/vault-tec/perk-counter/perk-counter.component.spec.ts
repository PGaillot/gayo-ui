import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkCounterComponent } from './perk-counter.component';

describe('PerkCounterComponent', () => {
  let component: PerkCounterComponent;
  let fixture: ComponentFixture<PerkCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerkCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerkCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
