import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
  let service: UserSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()]
    });
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
