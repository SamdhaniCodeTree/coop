import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCoopSocIndividualComponent } from './reg-coop-soc-individual.component';

describe('RegCoopSocIndividualComponent', () => {
  let component: RegCoopSocIndividualComponent;
  let fixture: ComponentFixture<RegCoopSocIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegCoopSocIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCoopSocIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
