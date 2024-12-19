import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliMandalComponent } from './mli-mandal.component';

describe('MliMandalComponent', () => {
  let component: MliMandalComponent;
  let fixture: ComponentFixture<MliMandalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliMandalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
