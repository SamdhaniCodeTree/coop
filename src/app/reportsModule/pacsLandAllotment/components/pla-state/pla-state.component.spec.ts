import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaStateComponent } from './pla-state.component';

describe('PlaStateComponent', () => {
  let component: PlaStateComponent;
  let fixture: ComponentFixture<PlaStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
