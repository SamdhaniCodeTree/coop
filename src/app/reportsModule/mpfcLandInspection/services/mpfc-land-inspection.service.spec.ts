import { TestBed } from '@angular/core/testing';

import { MpfcLandInspectionService } from './mpfc-land-inspection.service';

describe('MpfcLandInspectionService', () => {
  let service: MpfcLandInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpfcLandInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
