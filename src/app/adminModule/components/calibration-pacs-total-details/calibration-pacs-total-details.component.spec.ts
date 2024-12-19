import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationPacsTotalDetailsComponent } from './calibration-pacs-total-details.component';

describe('CalibrationPacsTotalDetailsComponent', () => {
  let component: CalibrationPacsTotalDetailsComponent;
  let fixture: ComponentFixture<CalibrationPacsTotalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationPacsTotalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationPacsTotalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
