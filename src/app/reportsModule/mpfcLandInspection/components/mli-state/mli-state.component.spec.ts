import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliStateComponent } from './mli-state.component';

describe('MliStateComponent', () => {
  let component: MliStateComponent;
  let fixture: ComponentFixture<MliStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
