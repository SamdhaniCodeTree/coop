import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStructureLevelDllicComponent } from './super-structure-level-dllic.component';

describe('SuperStructureLevelDllicComponent', () => {
  let component: SuperStructureLevelDllicComponent;
  let fixture: ComponentFixture<SuperStructureLevelDllicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperStructureLevelDllicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperStructureLevelDllicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
