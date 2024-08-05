import { TestBed } from '@angular/core/testing';

import { GayoLibService } from '../services/gayo-lib.service';

describe('GayoLibService', () => {
  let service: GayoLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GayoLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
