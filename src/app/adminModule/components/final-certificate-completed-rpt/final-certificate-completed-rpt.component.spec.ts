import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCertificateCompletedRptComponent } from './final-certificate-completed-rpt.component';

describe('FinalCertificateCompletedRptComponent', () => {
  let component: FinalCertificateCompletedRptComponent;
  let fixture: ComponentFixture<FinalCertificateCompletedRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalCertificateCompletedRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCertificateCompletedRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
