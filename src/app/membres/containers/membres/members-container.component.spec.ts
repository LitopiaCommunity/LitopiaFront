import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersContainer } from './members-container.component';

describe('MembresComponent', () => {
  let component: MembersContainer;
  let fixture: ComponentFixture<MembersContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
