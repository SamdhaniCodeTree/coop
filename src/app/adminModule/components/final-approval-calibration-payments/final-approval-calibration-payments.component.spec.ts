import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalApprovalCalibrationPaymentsComponent } from './final-approval-calibration-payments.component';

describe('FinalApprovalCalibrationPaymentsComponent', () => {
  let component: FinalApprovalCalibrationPaymentsComponent;
  let fixture: ComponentFixture<FinalApprovalCalibrationPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalApprovalCalibrationPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalApprovalCalibrationPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
