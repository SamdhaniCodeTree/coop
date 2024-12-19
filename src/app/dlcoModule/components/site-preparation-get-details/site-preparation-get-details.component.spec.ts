import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePreparationGetDetailsComponent } from './site-preparation-get-details.component';

describe('SitePreparationGetDetailsComponent', () => {
  let component: SitePreparationGetDetailsComponent;
  let fixture: ComponentFixture<SitePreparationGetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePreparationGetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePreparationGetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
