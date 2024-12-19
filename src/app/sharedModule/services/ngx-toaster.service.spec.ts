import { TestBed } from '@angular/core/testing';

import { NgxToasterService } from './ngx-toaster.service';

describe('NgxToasterService', () => {
  let service: NgxToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
