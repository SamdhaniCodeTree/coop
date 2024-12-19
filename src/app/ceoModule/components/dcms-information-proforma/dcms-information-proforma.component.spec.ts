import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmsInformationProformaComponent } from './dcms-information-proforma.component';

describe('DcmsInformationProformaComponent', () => {
  let component: DcmsInformationProformaComponent;
  let fixture: ComponentFixture<DcmsInformationProformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcmsInformationProformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmsInformationProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
