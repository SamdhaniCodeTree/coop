import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandallotmentphaseThreeRptComponent } from './pacs-landallotmentphase-three-rpt.component';

describe('PacsLandallotmentphaseThreeRptComponent', () => {
  let component: PacsLandallotmentphaseThreeRptComponent;
  let fixture: ComponentFixture<PacsLandallotmentphaseThreeRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandallotmentphaseThreeRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandallotmentphaseThreeRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
