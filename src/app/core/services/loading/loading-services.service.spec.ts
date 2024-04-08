import { TestBed } from '@angular/core/testing';

import { LoadingServicesService } from './loading-services.service';

describe('LoadingServicesService', () => {
  let service: LoadingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
