import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePreparationAproveRejectComponent } from './site-preparation-aprove-reject.component';

describe('SitePreparationAproveRejectComponent', () => {
  let component: SitePreparationAproveRejectComponent;
  let fixture: ComponentFixture<SitePreparationAproveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePreparationAproveRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePreparationAproveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
