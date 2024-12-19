import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationPaymentsReportComponent } from './calibration-payments-report.component';

describe('CalibrationPaymentsReportComponent', () => {
  let component: CalibrationPaymentsReportComponent;
  let fixture: ComponentFixture<CalibrationPaymentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationPaymentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
