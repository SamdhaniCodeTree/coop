import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePacsDeleteRptComponent } from './site-pacs-delete-rpt.component';

describe('SitePacsDeleteRptComponent', () => {
  let component: SitePacsDeleteRptComponent;
  let fixture: ComponentFixture<SitePacsDeleteRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePacsDeleteRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePacsDeleteRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
