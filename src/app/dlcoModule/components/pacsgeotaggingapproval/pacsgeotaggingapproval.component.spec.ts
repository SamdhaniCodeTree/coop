import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsgeotaggingapprovalComponent } from './pacsgeotaggingapproval.component';

describe('PacsgeotaggingapprovalComponent', () => {
  let component: PacsgeotaggingapprovalComponent;
  let fixture: ComponentFixture<PacsgeotaggingapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsgeotaggingapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsgeotaggingapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
