import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaStateReportComponent } from './pla-state-report.component';

describe('PlaStateReportComponent', () => {
  let component: PlaStateReportComponent;
  let fixture: ComponentFixture<PlaStateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaStateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaStateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
