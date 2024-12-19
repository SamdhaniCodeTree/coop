import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsComputerisationAbstractDistRptComponent } from './pacs-computerisation-abstract-dist-rpt.component';

describe('PacsComputerisationAbstractDistRptComponent', () => {
  let component: PacsComputerisationAbstractDistRptComponent;
  let fixture: ComponentFixture<PacsComputerisationAbstractDistRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsComputerisationAbstractDistRptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsComputerisationAbstractDistRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
