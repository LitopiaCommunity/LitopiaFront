import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilContainer } from './accueil-container.component';

describe('AcceuilComponent', () => {
  let component: AccueilContainer;
  let fixture: ComponentFixture<AccueilContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
