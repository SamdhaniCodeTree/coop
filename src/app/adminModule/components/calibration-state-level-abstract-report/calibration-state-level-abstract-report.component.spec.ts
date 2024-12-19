import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationStateLevelAbstractReportComponent } from './calibration-state-level-abstract-report.component';

describe('CalibrationStateLevelAbstractReportComponent', () => {
  let component: CalibrationStateLevelAbstractReportComponent;
  let fixture: ComponentFixture<CalibrationStateLevelAbstractReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationStateLevelAbstractReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationStateLevelAbstractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
