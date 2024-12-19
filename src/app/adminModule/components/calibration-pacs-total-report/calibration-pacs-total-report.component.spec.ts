import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationPacsTotalReportComponent } from './calibration-pacs-total-report.component';

describe('CalibrationPacsTotalReportComponent', () => {
  let component: CalibrationPacsTotalReportComponent;
  let fixture: ComponentFixture<CalibrationPacsTotalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationPacsTotalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationPacsTotalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
