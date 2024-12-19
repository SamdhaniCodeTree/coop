import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationCopsUpdComponent } from './calibration-cops-upd.component';

describe('CalibrationCopsUpdComponent', () => {
  let component: CalibrationCopsUpdComponent;
  let fixture: ComponentFixture<CalibrationCopsUpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationCopsUpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationCopsUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
