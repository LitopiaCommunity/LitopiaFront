import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NousRejoindreFormCounselComponent } from './nous-rejoindre-form-counsel.component';

describe('NousRejoindreFormCounselComponent', () => {
  let component: NousRejoindreFormCounselComponent;
  let fixture: ComponentFixture<NousRejoindreFormCounselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NousRejoindreFormCounselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NousRejoindreFormCounselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
