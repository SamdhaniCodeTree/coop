import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCompletedPacsRptComponent } from './not-completed-pacs-rpt.component';

describe('NotCompletedPacsRptComponent', () => {
  let component: NotCompletedPacsRptComponent;
  let fixture: ComponentFixture<NotCompletedPacsRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotCompletedPacsRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotCompletedPacsRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
