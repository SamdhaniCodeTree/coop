import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrattionsPARDtailsComponent } from './calibrattions-pardtails.component';

describe('CalibrattionsPARDtailsComponent', () => {
  let component: CalibrattionsPARDtailsComponent;
  let fixture: ComponentFixture<CalibrattionsPARDtailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrattionsPARDtailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrattionsPARDtailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
