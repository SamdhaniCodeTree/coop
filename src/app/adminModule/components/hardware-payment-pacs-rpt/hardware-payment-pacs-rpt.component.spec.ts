import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwarePaymentPacsRptComponent } from './hardware-payment-pacs-rpt.component';

describe('HardwarePaymentPacsRptComponent', () => {
  let component: HardwarePaymentPacsRptComponent;
  let fixture: ComponentFixture<HardwarePaymentPacsRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwarePaymentPacsRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwarePaymentPacsRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
