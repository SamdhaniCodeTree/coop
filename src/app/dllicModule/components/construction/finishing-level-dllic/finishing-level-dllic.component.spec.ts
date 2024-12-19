import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingLevelDllicComponent } from './finishing-level-dllic.component';

describe('FinishingLevelDllicComponent', () => {
  let component: FinishingLevelDllicComponent;
  let fixture: ComponentFixture<FinishingLevelDllicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishingLevelDllicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishingLevelDllicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
