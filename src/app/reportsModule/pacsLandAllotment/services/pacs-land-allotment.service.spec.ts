import { TestBed } from '@angular/core/testing';

import { PacsLandAllotmentService } from './pacs-land-allotment.service';

describe('PacsLandAllotmentService', () => {
  let service: PacsLandAllotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacsLandAllotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
