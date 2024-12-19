import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStructureLevelDeeComponent } from './super-structure-level-dee.component';

describe('SuperStructureLevelDeeComponent', () => {
  let component: SuperStructureLevelDeeComponent;
  let fixture: ComponentFixture<SuperStructureLevelDeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperStructureLevelDeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperStructureLevelDeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
