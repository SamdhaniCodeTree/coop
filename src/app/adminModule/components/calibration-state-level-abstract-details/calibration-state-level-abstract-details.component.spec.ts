import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationStateLevelAbstractDetailsComponent } from './calibration-state-level-abstract-details.component';

describe('CalibrationStateLevelAbstractDetailsComponent', () => {
  let component: CalibrationStateLevelAbstractDetailsComponent;
  let fixture: ComponentFixture<CalibrationStateLevelAbstractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationStateLevelAbstractDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationStateLevelAbstractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
