import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaDistrictReportComponent } from './pla-district-report.component';

describe('PlaDistrictReportComponent', () => {
  let component: PlaDistrictReportComponent;
  let fixture: ComponentFixture<PlaDistrictReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaDistrictReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaDistrictReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
