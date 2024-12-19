import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetAproveRejectComponent } from './internet-aprove-reject.component';

describe('InternetAproveRejectComponent', () => {
  let component: InternetAproveRejectComponent;
  let fixture: ComponentFixture<InternetAproveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetAproveRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetAproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
