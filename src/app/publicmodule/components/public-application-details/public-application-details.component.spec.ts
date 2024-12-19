import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicApplicationDetailsComponent } from './public-application-details.component';

describe('PublicApplicationDetailsComponent', () => {
  let component: PublicApplicationDetailsComponent;
  let fixture: ComponentFixture<PublicApplicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicApplicationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
