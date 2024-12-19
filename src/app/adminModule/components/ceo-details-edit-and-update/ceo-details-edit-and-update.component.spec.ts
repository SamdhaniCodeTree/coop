import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoDetailsEditAndUpdateComponent } from './ceo-details-edit-and-update.component';

describe('CeoDetailsEditAndUpdateComponent', () => {
  let component: CeoDetailsEditAndUpdateComponent;
  let fixture: ComponentFixture<CeoDetailsEditAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeoDetailsEditAndUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoDetailsEditAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
