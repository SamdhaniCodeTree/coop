import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingLevelComponent } from './finishing-level.component';

describe('FinishingLevelComponent', () => {
  let component: FinishingLevelComponent;
  let fixture: ComponentFixture<FinishingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishingLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
