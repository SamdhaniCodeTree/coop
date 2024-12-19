import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInspectionDllicComponent } from './site-inspection-dllic.component';

describe('SiteInspectionDllicComponent', () => {
  let component: SiteInspectionDllicComponent;
  let fixture: ComponentFixture<SiteInspectionDllicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInspectionDllicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInspectionDllicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
