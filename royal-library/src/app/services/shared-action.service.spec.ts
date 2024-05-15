import { TestBed } from '@angular/core/testing';

import { SharedActionService } from './shared-action.service';

describe('SharedActionService', () => {
  let service: SharedActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
