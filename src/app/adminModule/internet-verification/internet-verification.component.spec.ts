import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetVerificationComponent } from './internet-verification.component';

describe('InternetVerificationComponent', () => {
  let component: InternetVerificationComponent;
  let fixture: ComponentFixture<InternetVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
