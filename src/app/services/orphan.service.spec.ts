import { TestBed } from '@angular/core/testing';

import { FamilyService } from './orphan.service';

describe('OrphanService', () => {
  let service: FamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
