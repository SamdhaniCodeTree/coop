import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetConnectionCalibComponent } from './internet-connection-calib.component';

describe('InternetConnectionCalibComponent', () => {
  let component: InternetConnectionCalibComponent;
  let fixture: ComponentFixture<InternetConnectionCalibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetConnectionCalibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetConnectionCalibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
