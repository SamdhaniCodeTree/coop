import { TestBed } from '@angular/core/testing';

import { DmtService } from './dmt.service';

describe('DmtService', () => {
  let service: DmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
