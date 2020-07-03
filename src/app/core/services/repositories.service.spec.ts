import { TestBed } from '@angular/core/testing';

import { RepositoriesService } from './repositories.service';

describe('RepositoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositoriesService = TestBed.get(RepositoriesService);
    expect(service).toBeTruthy();
  });
});
