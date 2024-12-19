import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandInspectionComponent } from './pacs-land-inspection.component';

describe('PacsLandInspectionComponent', () => {
  let component: PacsLandInspectionComponent;
  let fixture: ComponentFixture<PacsLandInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
