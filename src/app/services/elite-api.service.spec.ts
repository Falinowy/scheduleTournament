import { TestBed } from '@angular/core/testing';

import { EliteApiService } from './elite-api.service';

describe('EliteApiService', () => {
  let service: EliteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
