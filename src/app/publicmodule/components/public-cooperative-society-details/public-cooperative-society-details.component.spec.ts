import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCooperativeSocietyDetailsComponent } from './public-cooperative-society-details.component';

describe('PublicCooperativeSocietyDetailsComponent', () => {
  let component: PublicCooperativeSocietyDetailsComponent;
  let fixture: ComponentFixture<PublicCooperativeSocietyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCooperativeSocietyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCooperativeSocietyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
