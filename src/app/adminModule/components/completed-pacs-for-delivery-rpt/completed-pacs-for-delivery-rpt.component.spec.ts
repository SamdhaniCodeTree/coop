import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForDeliveryRptComponent } from './completed-pacs-for-delivery-rpt.component';

describe('CompletedPacsForDeliveryRptComponent', () => {
  let component: CompletedPacsForDeliveryRptComponent;
  let fixture: ComponentFixture<CompletedPacsForDeliveryRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForDeliveryRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForDeliveryRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
