import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForDeliveryDetailsComponent } from './completed-pacs-for-delivery-details.component';

describe('CompletedPacsForDeliveryDetailsComponent', () => {
  let component: CompletedPacsForDeliveryDetailsComponent;
  let fixture: ComponentFixture<CompletedPacsForDeliveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForDeliveryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
