import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonPresentationsComponent } from './season-presentations.component';

describe('SeasonPresentationsComponent', () => {
  let component: SeasonPresentationsComponent;
  let fixture: ComponentFixture<SeasonPresentationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonPresentationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonPresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
