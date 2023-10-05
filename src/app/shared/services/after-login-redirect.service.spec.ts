import { TestBed } from '@angular/core/testing';

import { AfterLoginRedirectService } from './after-login-redirect.service';

describe('AfterLoginRedirectService', () => {
  let service: AfterLoginRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterLoginRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
