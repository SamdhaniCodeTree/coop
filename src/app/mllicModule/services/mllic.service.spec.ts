import { TestBed } from '@angular/core/testing';

import { MllicService } from './mllic.service';

describe('MllicService', () => {
  let service: MllicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MllicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
