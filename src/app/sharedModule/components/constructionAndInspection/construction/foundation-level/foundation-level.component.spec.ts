import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationLevelComponent } from './foundation-level.component';

describe('FoundationLevelComponent', () => {
  let component: FoundationLevelComponent;
  let fixture: ComponentFixture<FoundationLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
