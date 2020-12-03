import { TestBed } from '@angular/core/testing';

import { ApiReactiveService } from './api-reactive.service';

describe('ApiReactiveService', () => {
  let service: ApiReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
