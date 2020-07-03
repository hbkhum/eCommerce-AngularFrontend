import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesService } from './services/repositories.service';
import { ProductsService } from './services/products/products.service';
import { AuthService } from './services/auth/auth.service';
import { ProductsImagesService } from './services/products-images/products-images.service';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProductsService,
    AuthService,
    ProductsImagesService,
    RepositoriesService
  ]
})
export class CoreModule { }
