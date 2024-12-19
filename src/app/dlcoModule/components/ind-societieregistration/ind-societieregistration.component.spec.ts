import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndSocietieregistrationComponent } from './ind-societieregistration.component';

describe('IndSocietieregistrationComponent', () => {
  let component: IndSocietieregistrationComponent;
  let fixture: ComponentFixture<IndSocietieregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndSocietieregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndSocietieregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
