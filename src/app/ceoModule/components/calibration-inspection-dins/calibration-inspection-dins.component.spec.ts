import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationInspectionDInsComponent } from './calibration-inspection-dins.component';

describe('CalibrationInspectionDInsComponent', () => {
  let component: CalibrationInspectionDInsComponent;
  let fixture: ComponentFixture<CalibrationInspectionDInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationInspectionDInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationInspectionDInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
