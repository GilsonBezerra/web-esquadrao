import { TestBed } from '@angular/core/testing';

import { PromocionalService } from './promocional.service';

describe('PromocionalService', () => {
  let service: PromocionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
