import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationInternetDetailsReportComponent } from './calibration-internet-details-report.component';

describe('CalibrationInternetDetailsReportComponent', () => {
  let component: CalibrationInternetDetailsReportComponent;
  let fixture: ComponentFixture<CalibrationInternetDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationInternetDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationInternetDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
