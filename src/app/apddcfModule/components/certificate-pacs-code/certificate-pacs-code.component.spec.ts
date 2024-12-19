import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatePacsCodeComponent } from './certificate-pacs-code.component';

describe('CertificatePacsCodeComponent', () => {
  let component: CertificatePacsCodeComponent;
  let fixture: ComponentFixture<CertificatePacsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatePacsCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatePacsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
