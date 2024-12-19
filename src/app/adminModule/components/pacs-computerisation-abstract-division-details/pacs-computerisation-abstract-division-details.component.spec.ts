import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsComputerisationAbstractDivisionDetailsComponent } from './pacs-computerisation-abstract-division-details.component';

describe('PacsComputerisationAbstractDivisionDetailsComponent', () => {
  let component: PacsComputerisationAbstractDivisionDetailsComponent;
  let fixture: ComponentFixture<PacsComputerisationAbstractDivisionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsComputerisationAbstractDivisionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsComputerisationAbstractDivisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
