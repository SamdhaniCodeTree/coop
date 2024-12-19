import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsgeotagginglistComponent } from './pacsgeotagginglist.component';

describe('PacsgeotagginglistComponent', () => {
  let component: PacsgeotagginglistComponent;
  let fixture: ComponentFixture<PacsgeotagginglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsgeotagginglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsgeotagginglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
