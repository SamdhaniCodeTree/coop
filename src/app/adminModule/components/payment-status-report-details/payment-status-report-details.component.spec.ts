import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusReportDetailsComponent } from './payment-status-report-details.component';

describe('PaymentStatusReportDetailsComponent', () => {
  let component: PaymentStatusReportDetailsComponent;
  let fixture: ComponentFixture<PaymentStatusReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusReportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
