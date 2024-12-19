import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsLandHandOverphaseComponent } from './pacs-land-hand-overphase.component';

describe('PacsLandHandOverphaseComponent', () => {
  let component: PacsLandHandOverphaseComponent;
  let fixture: ComponentFixture<PacsLandHandOverphaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsLandHandOverphaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsLandHandOverphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
