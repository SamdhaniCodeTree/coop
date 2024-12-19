import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationSubmittedDetailsComponent } from './calibration-submitted-details.component';

describe('CalibrationSubmittedDetailsComponent', () => {
  let component: CalibrationSubmittedDetailsComponent;
  let fixture: ComponentFixture<CalibrationSubmittedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationSubmittedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationSubmittedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
