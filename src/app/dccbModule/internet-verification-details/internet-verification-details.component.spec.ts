import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetVerificationDetailsComponent } from './internet-verification-details.component';

describe('InternetVerificationDetailsComponent', () => {
  let component: InternetVerificationDetailsComponent;
  let fixture: ComponentFixture<InternetVerificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetVerificationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetVerificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
