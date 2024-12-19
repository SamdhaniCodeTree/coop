import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoRegistrationComponent } from './ceo-registration.component';

describe('CeoRegistrationComponent', () => {
  let component: CeoRegistrationComponent;
  let fixture: ComponentFixture<CeoRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeoRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
