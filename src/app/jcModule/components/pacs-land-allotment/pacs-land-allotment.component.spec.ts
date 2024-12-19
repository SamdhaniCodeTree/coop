import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandAllotmentComponent } from './pacs-land-allotment.component';

describe('PacsLandAllotmentComponent', () => {
  let component: PacsLandAllotmentComponent;
  let fixture: ComponentFixture<PacsLandAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
