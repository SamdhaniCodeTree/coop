import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliDistrictReportComponent } from './mli-district-report.component';

describe('MliDistrictReportComponent', () => {
  let component: MliDistrictReportComponent;
  let fixture: ComponentFixture<MliDistrictReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliDistrictReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliDistrictReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
