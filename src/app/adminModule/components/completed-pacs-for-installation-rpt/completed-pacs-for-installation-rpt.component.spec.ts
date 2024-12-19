import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForInstallationRptComponent } from './completed-pacs-for-installation-rpt.component';

describe('CompletedPacsForInstallationRptComponent', () => {
  let component: CompletedPacsForInstallationRptComponent;
  let fixture: ComponentFixture<CompletedPacsForInstallationRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForInstallationRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForInstallationRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
