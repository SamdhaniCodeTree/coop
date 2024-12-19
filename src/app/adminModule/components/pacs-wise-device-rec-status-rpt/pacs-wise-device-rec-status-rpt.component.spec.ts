import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsWiseDeviceRecStatusRptComponent } from './pacs-wise-device-rec-status-rpt.component';

describe('PacsWiseDeviceRecStatusRptComponent', () => {
  let component: PacsWiseDeviceRecStatusRptComponent;
  let fixture: ComponentFixture<PacsWiseDeviceRecStatusRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsWiseDeviceRecStatusRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsWiseDeviceRecStatusRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
