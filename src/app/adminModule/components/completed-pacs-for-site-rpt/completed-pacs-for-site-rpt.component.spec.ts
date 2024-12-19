import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForSiteRptComponent } from './completed-pacs-for-site-rpt.component';

describe('CompletedPacsForSiteRptComponent', () => {
  let component: CompletedPacsForSiteRptComponent;
  let fixture: ComponentFixture<CompletedPacsForSiteRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForSiteRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForSiteRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
