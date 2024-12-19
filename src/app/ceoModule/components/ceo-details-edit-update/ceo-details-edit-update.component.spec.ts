import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoDetailsEditUpdateComponent } from './ceo-details-edit-update.component';

describe('CeoDetailsEditUpdateComponent', () => {
  let component: CeoDetailsEditUpdateComponent;
  let fixture: ComponentFixture<CeoDetailsEditUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeoDetailsEditUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoDetailsEditUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
