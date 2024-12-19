import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwarePaymentsTotalnoofPacsReportComponent } from './hardware-payments-totalnoof-pacs-report.component';

describe('HardwarePaymentsTotalnoofPacsReportComponent', () => {
  let component: HardwarePaymentsTotalnoofPacsReportComponent;
  let fixture: ComponentFixture<HardwarePaymentsTotalnoofPacsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwarePaymentsTotalnoofPacsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwarePaymentsTotalnoofPacsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
