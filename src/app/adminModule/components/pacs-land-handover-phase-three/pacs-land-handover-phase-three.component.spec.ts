import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandHandoverPhaseThreeComponent } from './pacs-land-handover-phase-three.component';

describe('PacsLandHandoverPhaseThreeComponent', () => {
  let component: PacsLandHandoverPhaseThreeComponent;
  let fixture: ComponentFixture<PacsLandHandoverPhaseThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandHandoverPhaseThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandHandoverPhaseThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
