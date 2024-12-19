import { TestBed } from '@angular/core/testing';

import { CeoService } from './ceo.service';

describe('CeoService', () => {
  let service: CeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
