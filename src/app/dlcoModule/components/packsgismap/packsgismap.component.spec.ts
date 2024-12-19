import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksgismapComponent } from './packsgismap.component';

describe('PacksgismapComponent', () => {
  let component: PacksgismapComponent;
  let fixture: ComponentFixture<PacksgismapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacksgismapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksgismapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
