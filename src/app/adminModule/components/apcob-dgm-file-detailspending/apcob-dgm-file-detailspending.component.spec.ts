import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApcobDgmFileDetailspendingComponent } from './apcob-dgm-file-detailspending.component';

describe('ApcobDgmFileDetailspendingComponent', () => {
  let component: ApcobDgmFileDetailspendingComponent;
  let fixture: ComponentFixture<ApcobDgmFileDetailspendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApcobDgmFileDetailspendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApcobDgmFileDetailspendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
