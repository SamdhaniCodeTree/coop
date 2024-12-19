import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandAllotmentphasetwoComponent } from './pacs-land-allotmentphasetwo.component';

describe('PacsLandAllotmentphasetwoComponent', () => {
  let component: PacsLandAllotmentphasetwoComponent;
  let fixture: ComponentFixture<PacsLandAllotmentphasetwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandAllotmentphasetwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandAllotmentphasetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
