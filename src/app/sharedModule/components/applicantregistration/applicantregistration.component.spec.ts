import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantregistrationComponent } from './applicantregistration.component';

describe('ApplicantregistrationComponent', () => {
  let component: ApplicantregistrationComponent;
  let fixture: ComponentFixture<ApplicantregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
