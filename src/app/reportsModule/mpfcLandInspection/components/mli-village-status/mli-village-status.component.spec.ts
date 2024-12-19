import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliVillageStatusComponent } from './mli-village-status.component';

describe('MliVillageStatusComponent', () => {
  let component: MliVillageStatusComponent;
  let fixture: ComponentFixture<MliVillageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliVillageStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliVillageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
