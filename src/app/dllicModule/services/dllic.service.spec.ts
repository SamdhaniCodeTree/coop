import { TestBed } from '@angular/core/testing';

import { DllicService } from './dllic.service';

describe('DllicService', () => {
  let service: DllicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DllicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
