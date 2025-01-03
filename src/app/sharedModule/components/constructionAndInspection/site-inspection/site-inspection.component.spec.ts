import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInspectionComponent } from './site-inspection.component';

describe('SiteInspectionComponent', () => {
  let component: SiteInspectionComponent;
  let fixture: ComponentFixture<SiteInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
