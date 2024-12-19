import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationDeviceDatesInsComponent } from './calibration-device-dates-ins.component';

describe('CalibrationDeviceDatesInsComponent', () => {
  let component: CalibrationDeviceDatesInsComponent;
  let fixture: ComponentFixture<CalibrationDeviceDatesInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationDeviceDatesInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationDeviceDatesInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
