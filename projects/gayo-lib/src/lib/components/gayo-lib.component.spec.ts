import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GayoLibComponent } from './gayo-lib.component';

describe('GayoLibComponent', () => {
  let component: GayoLibComponent;
  let fixture: ComponentFixture<GayoLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GayoLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GayoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
