import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaMandalComponent } from './pla-mandal.component';

describe('PlaMandalComponent', () => {
  let component: PlaMandalComponent;
  let fixture: ComponentFixture<PlaMandalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaMandalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaMandalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
