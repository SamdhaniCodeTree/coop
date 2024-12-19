import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MliDistrictComponent } from './mli-district.component';

describe('MliDistrictComponent', () => {
  let component: MliDistrictComponent;
  let fixture: ComponentFixture<MliDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MliDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MliDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
