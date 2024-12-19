import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationLevelDllicComponent } from './foundation-level-dllic.component';

describe('FoundationLevelDllicComponent', () => {
  let component: FoundationLevelDllicComponent;
  let fixture: ComponentFixture<FoundationLevelDllicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundationLevelDllicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationLevelDllicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
