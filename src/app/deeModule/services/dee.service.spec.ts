import { TestBed } from '@angular/core/testing';

import { DeeService } from './dee.service';

describe('DeeService', () => {
  let service: DeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
