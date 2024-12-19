import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcoopSocietieComponent } from './regcoop-societie.component';

describe('RegcoopSocietieComponent', () => {
  let component: RegcoopSocietieComponent;
  let fixture: ComponentFixture<RegcoopSocietieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegcoopSocietieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegcoopSocietieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
