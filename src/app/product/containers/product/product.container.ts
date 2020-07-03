import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-container',
  templateUrl: './product.container.html',
  styleUrls: ['./product.container.scss']
})
export class ProductContainer implements OnInit {
  products: Product[] = [];
  constructor(
    private repositoriesService: RepositoriesService,
    private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.spinnerService.show();
    this.repositoriesService.productsService.getAllProductsWhitImages()
      .subscribe(products => {
        this.products = products.content;
      },
      err => {
        console.log(err);
      },
      () => {
        this.spinnerService.hide();
      }
    );
  }

}

