import { TestBed } from '@angular/core/testing';

import { LoginSimService } from './login-sim.service';

describe('LoginSimService', () => {
  let service: LoginSimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
