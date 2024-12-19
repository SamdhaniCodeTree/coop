import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePreparationSubComponent } from './site-preparation-sub.component';

describe('SitePreparationSubComponent', () => {
  let component: SitePreparationSubComponent;
  let fixture: ComponentFixture<SitePreparationSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePreparationSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePreparationSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
