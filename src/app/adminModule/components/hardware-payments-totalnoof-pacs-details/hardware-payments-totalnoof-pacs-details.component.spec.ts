import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwarePaymentsTotalnoofPacsDetailsComponent } from './hardware-payments-totalnoof-pacs-details.component';

describe('HardwarePaymentsTotalnoofPacsDetailsComponent', () => {
  let component: HardwarePaymentsTotalnoofPacsDetailsComponent;
  let fixture: ComponentFixture<HardwarePaymentsTotalnoofPacsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwarePaymentsTotalnoofPacsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwarePaymentsTotalnoofPacsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
