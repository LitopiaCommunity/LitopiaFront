import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureContentDeliveryComponent } from './picture-content-delivery.component';

describe('PictureContentDeliveryComponent', () => {
  let component: PictureContentDeliveryComponent;
  let fixture: ComponentFixture<PictureContentDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureContentDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureContentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
