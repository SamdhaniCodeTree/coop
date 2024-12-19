import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInspectionUpdateComponent } from './site-inspection-update.component';

describe('SiteInspectionUpdateComponent', () => {
  let component: SiteInspectionUpdateComponent;
  let fixture: ComponentFixture<SiteInspectionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInspectionUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInspectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
