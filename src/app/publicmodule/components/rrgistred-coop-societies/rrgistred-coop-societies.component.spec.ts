import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrgistredCoopSocietiesComponent } from './rrgistred-coop-societies.component';

describe('RrgistredCoopSocietiesComponent', () => {
  let component: RrgistredCoopSocietiesComponent;
  let fixture: ComponentFixture<RrgistredCoopSocietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrgistredCoopSocietiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrgistredCoopSocietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
