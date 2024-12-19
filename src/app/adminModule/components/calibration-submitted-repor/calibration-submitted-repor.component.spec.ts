import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationSubmittedReporComponent } from './calibration-submitted-repor.component';

describe('CalibrationSubmittedReporComponent', () => {
  let component: CalibrationSubmittedReporComponent;
  let fixture: ComponentFixture<CalibrationSubmittedReporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationSubmittedReporComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationSubmittedReporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
