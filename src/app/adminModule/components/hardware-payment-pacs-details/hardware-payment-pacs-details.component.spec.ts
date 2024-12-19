import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwarePaymentPacsDetailsComponent } from './hardware-payment-pacs-details.component';

describe('HardwarePaymentPacsDetailsComponent', () => {
  let component: HardwarePaymentPacsDetailsComponent;
  let fixture: ComponentFixture<HardwarePaymentPacsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwarePaymentPacsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwarePaymentPacsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
