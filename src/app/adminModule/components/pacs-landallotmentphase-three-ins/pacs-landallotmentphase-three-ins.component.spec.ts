import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandallotmentphaseThreeInsComponent } from './pacs-landallotmentphase-three-ins.component';

describe('PacsLandallotmentphaseThreeInsComponent', () => {
  let component: PacsLandallotmentphaseThreeInsComponent;
  let fixture: ComponentFixture<PacsLandallotmentphaseThreeInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandallotmentphaseThreeInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandallotmentphaseThreeInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
