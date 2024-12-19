import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCompletedPacsDetailsComponent } from './not-completed-pacs-details.component';

describe('NotCompletedPacsDetailsComponent', () => {
  let component: NotCompletedPacsDetailsComponent;
  let fixture: ComponentFixture<NotCompletedPacsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotCompletedPacsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotCompletedPacsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
