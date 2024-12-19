import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationPaymentsComponent } from './calibration-payments.component';

describe('CalibrationPaymentsComponent', () => {
  let component: CalibrationPaymentsComponent;
  let fixture: ComponentFixture<CalibrationPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
