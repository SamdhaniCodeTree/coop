import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsComputerisationAbstractDistDetailsComponent } from './pacs-computerisation-abstract-dist-details.component';

describe('PacsComputerisationAbstractDistDetailsComponent', () => {
  let component: PacsComputerisationAbstractDistDetailsComponent;
  let fixture: ComponentFixture<PacsComputerisationAbstractDistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsComputerisationAbstractDistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsComputerisationAbstractDistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
