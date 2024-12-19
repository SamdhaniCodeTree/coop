import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationCopsComponent } from './calibration-cops.component';

describe('CalibrationCopsComponent', () => {
  let component: CalibrationCopsComponent;
  let fixture: ComponentFixture<CalibrationCopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationCopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationCopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
