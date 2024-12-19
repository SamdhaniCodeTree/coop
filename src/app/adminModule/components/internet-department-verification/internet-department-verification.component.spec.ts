import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetDepartmentVerificationComponent } from './internet-department-verification.component';

describe('InternetDepartmentVerificationComponent', () => {
  let component: InternetDepartmentVerificationComponent;
  let fixture: ComponentFixture<InternetDepartmentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetDepartmentVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetDepartmentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
