import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkCardComponent } from './perk-card.component';
import { PerksType } from '../../../services/perks.service';

describe('PerkCardComponent', () => {
  let component: PerkCardComponent;
  let fixture: ComponentFixture<PerkCardComponent>;

  const perk: PerksType = 'strength';
  const description = 'description';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerkCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerkCardComponent);
    component = fixture.componentInstance;
    component.perkName = perk;
    component.description = description;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
