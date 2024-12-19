import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandAllotmentphase2Component } from './pacs-land-allotmentphase2.component';

describe('PacsLandAllotmentphase2Component', () => {
  let component: PacsLandAllotmentphase2Component;
  let fixture: ComponentFixture<PacsLandAllotmentphase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandAllotmentphase2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandAllotmentphase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
