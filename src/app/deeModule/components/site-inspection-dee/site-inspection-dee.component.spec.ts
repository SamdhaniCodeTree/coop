import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInspectionDeeComponent } from './site-inspection-dee.component';

describe('SiteInspectionDeeComponent', () => {
  let component: SiteInspectionDeeComponent;
  let fixture: ComponentFixture<SiteInspectionDeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInspectionDeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInspectionDeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
