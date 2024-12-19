import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsComputerisationAbstractDivisionRptComponent } from './pacs-computerisation-abstract-division-rpt.component';

describe('PacsComputerisationAbstractDivisionRptComponent', () => {
  let component: PacsComputerisationAbstractDivisionRptComponent;
  let fixture: ComponentFixture<PacsComputerisationAbstractDivisionRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsComputerisationAbstractDivisionRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsComputerisationAbstractDivisionRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
