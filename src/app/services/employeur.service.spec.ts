import { TestBed } from '@angular/core/testing';

import { EmployeurService } from './employeur.service';

describe('EmployeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeurService = TestBed.get(EmployeurService);
    expect(service).toBeTruthy();
  });
});
