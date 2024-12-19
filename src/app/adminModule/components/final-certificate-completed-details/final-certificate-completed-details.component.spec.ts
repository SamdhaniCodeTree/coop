import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCertificateCompletedDetailsComponent } from './final-certificate-completed-details.component';

describe('FinalCertificateCompletedDetailsComponent', () => {
  let component: FinalCertificateCompletedDetailsComponent;
  let fixture: ComponentFixture<FinalCertificateCompletedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalCertificateCompletedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCertificateCompletedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
