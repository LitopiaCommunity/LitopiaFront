import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NousRejoindreFormAdhesionComponent } from './nous-rejoindre-form-adhesion.component';

describe('NousRejoindreFormAdhesionComponent', () => {
  let component: NousRejoindreFormAdhesionComponent;
  let fixture: ComponentFixture<NousRejoindreFormAdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NousRejoindreFormAdhesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NousRejoindreFormAdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
