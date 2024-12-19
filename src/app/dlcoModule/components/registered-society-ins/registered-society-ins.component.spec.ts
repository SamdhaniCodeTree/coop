import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSocietyInsComponent } from './registered-society-ins.component';

describe('RegisteredSocietyInsComponent', () => {
  let component: RegisteredSocietyInsComponent;
  let fixture: ComponentFixture<RegisteredSocietyInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredSocietyInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredSocietyInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
