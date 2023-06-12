import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NousRejoindreFormComponent } from './nous-rejoindre-form.component';

describe('NousRejoindreFormComponent', () => {
  let component: NousRejoindreFormComponent;
  let fixture: ComponentFixture<NousRejoindreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NousRejoindreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NousRejoindreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
