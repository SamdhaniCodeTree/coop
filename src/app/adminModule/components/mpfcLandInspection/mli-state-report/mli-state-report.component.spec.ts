import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliStateReportComponent } from './mli-state-report.component';

describe('MliStateReportComponent', () => {
  let component: MliStateReportComponent;
  let fixture: ComponentFixture<MliStateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliStateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliStateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
