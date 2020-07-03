import { Injectable } from '@angular/core';
import { ProductsService } from './products/products.service';
import { AuthService } from './auth/auth.service';
import { ProductsImagesService } from './products-images/products-images.service';
import { CartService } from './cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(
    public productsService: ProductsService,
    public authService: AuthService,
    public productImageService: ProductsImagesService,
    public cartService: CartService
    // public productImage: ProductImage
  ) { }
}
