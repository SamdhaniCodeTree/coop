import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtdetailsaprComponent } from './dmtdetailsapr.component';

describe('DmtdetailsaprComponent', () => {
  let component: DmtdetailsaprComponent;
  let fixture: ComponentFixture<DmtdetailsaprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmtdetailsaprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtdetailsaprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
