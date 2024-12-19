import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaDistrictComponent } from './pla-district.component';

describe('PlaDistrictComponent', () => {
  let component: PlaDistrictComponent;
  let fixture: ComponentFixture<PlaDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
