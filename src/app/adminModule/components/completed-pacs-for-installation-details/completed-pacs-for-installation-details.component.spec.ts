import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPacsForInstallationDetailsComponent } from './completed-pacs-for-installation-details.component';

describe('CompletedPacsForInstallationDetailsComponent', () => {
  let component: CompletedPacsForInstallationDetailsComponent;
  let fixture: ComponentFixture<CompletedPacsForInstallationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedPacsForInstallationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPacsForInstallationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
