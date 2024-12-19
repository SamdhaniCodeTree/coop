import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsRemarksReportComponent } from './pacs-remarks-report.component';

describe('PacsRemarksReportComponent', () => {
  let component: PacsRemarksReportComponent;
  let fixture: ComponentFixture<PacsRemarksReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsRemarksReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsRemarksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
