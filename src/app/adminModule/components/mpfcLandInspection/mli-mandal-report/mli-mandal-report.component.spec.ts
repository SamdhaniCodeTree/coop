import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliMandalReportComponent } from './mli-mandal-report.component';

describe('MliMandalReportComponent', () => {
  let component: MliMandalReportComponent;
  let fixture: ComponentFixture<MliMandalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliMandalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliMandalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
