import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsmasterComponent } from './pacsmaster.component';

describe('PacsmasterComponent', () => {
  let component: PacsmasterComponent;
  let fixture: ComponentFixture<PacsmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
