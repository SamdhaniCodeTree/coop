import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForSiteDetailsComponent } from './completed-pacs-for-site-details.component';

describe('CompletedPacsForSiteDetailsComponent', () => {
  let component: CompletedPacsForSiteDetailsComponent;
  let fixture: ComponentFixture<CompletedPacsForSiteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForSiteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForSiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
