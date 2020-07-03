import { TestBed } from '@angular/core/testing';

import { ProductsImagesService } from './products-images.service';

describe('ProductsImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsImagesService = TestBed.get(ProductsImagesService);
    expect(service).toBeTruthy();
  });
});
