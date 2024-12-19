import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingLevelDeeComponent } from './finishing-level-dee.component';

describe('FinishingLevelDeeComponent', () => {
  let component: FinishingLevelDeeComponent;
  let fixture: ComponentFixture<FinishingLevelDeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishingLevelDeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishingLevelDeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
