import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationLevelDeeComponent } from './foundation-level-dee.component';

describe('FoundationLevelDeeComponent', () => {
  let component: FoundationLevelDeeComponent;
  let fixture: ComponentFixture<FoundationLevelDeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationLevelDeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationLevelDeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
