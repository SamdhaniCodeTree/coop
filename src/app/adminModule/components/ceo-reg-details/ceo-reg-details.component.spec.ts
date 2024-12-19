import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoRegDetailsComponent } from './ceo-reg-details.component';

describe('CeoRegDetailsComponent', () => {
  let component: CeoRegDetailsComponent;
  let fixture: ComponentFixture<CeoRegDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeoRegDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoRegDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
