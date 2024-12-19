import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandHandOverPhaseTwoComponent } from './pacs-land-hand-over-phase-two.component';

describe('PacsLandHandOverPhaseTwoComponent', () => {
  let component: PacsLandHandOverPhaseTwoComponent;
  let fixture: ComponentFixture<PacsLandHandOverPhaseTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandHandOverPhaseTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandHandOverPhaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
