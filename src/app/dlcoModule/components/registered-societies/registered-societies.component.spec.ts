import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSocietiesComponent } from './registered-societies.component';

describe('RegisteredSocietiesComponent', () => {
  let component: RegisteredSocietiesComponent;
  let fixture: ComponentFixture<RegisteredSocietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredSocietiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredSocietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
