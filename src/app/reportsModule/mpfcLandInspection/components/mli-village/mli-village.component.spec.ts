import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliVillageComponent } from './mli-village.component';

describe('MliVillageComponent', () => {
  let component: MliVillageComponent;
  let fixture: ComponentFixture<MliVillageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliVillageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
