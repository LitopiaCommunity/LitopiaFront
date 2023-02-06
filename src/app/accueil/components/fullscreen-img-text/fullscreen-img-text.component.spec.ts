import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenImgTextComponent } from './fullscreen-img-text.component';

describe('FullscreenImgTextrComponent', () => {
  let component: FullscreenImgTextComponent;
  let fixture: ComponentFixture<FullscreenImgTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenImgTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenImgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
