import { TestBed } from '@angular/core/testing';

import { EnvProviderService } from './env-provider.service';

describe('EnvProviderService', () => {
  let service: EnvProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
