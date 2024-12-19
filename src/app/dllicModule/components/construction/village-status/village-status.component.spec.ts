import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageStatusComponent } from './village-status.component';

describe('VillageStatusComponent', () => {
  let component: VillageStatusComponent;
  let fixture: ComponentFixture<VillageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillageStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
