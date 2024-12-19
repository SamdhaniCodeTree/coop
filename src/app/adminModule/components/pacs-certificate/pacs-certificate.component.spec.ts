import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsCertificateComponent } from './pacs-certificate.component';

describe('PacsCertificateComponent', () => {
  let component: PacsCertificateComponent;
  let fixture: ComponentFixture<PacsCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
