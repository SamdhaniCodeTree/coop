import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliVillageReportComponent } from './mli-village-report.component';

describe('MliVillageReportComponent', () => {
  let component: MliVillageReportComponent;
  let fixture: ComponentFixture<MliVillageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliVillageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliVillageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
