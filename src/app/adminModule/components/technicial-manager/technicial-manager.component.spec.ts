import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicialManagerComponent } from './technicial-manager.component';

describe('TechnicialManagerComponent', () => {
  let component: TechnicialManagerComponent;
  let fixture: ComponentFixture<TechnicialManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicialManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
