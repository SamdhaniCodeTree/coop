import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaMandalReportComponent } from './pla-mandal-report.component';

describe('PlaMandalReportComponent', () => {
  let component: PlaMandalReportComponent;
  let fixture: ComponentFixture<PlaMandalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaMandalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaMandalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
