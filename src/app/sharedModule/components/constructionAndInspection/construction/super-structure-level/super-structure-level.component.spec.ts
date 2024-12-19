import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStructureLevelComponent } from './super-structure-level.component';

describe('SuperStructureLevelComponent', () => {
  let component: SuperStructureLevelComponent;
  let fixture: ComponentFixture<SuperStructureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperStructureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperStructureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
