import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSocietyDetailsComponent } from './public-society-details.component';

describe('PublicSocietyDetailsComponent', () => {
  let component: PublicSocietyDetailsComponent;
  let fixture: ComponentFixture<PublicSocietyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSocietyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSocietyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
