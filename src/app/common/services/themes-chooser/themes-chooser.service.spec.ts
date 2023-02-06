import { TestBed } from '@angular/core/testing';

import { ThemesChooserService } from './themes-chooser.service';

describe('ThemesChooserService', () => {
  let service: ThemesChooserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesChooserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
