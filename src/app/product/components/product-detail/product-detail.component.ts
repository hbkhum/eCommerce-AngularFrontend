import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  constructor(
    private route: ActivatedRoute,
    private repositoriesService: RepositoriesService) { }

  ngOnInit() {
    this.product$ = this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.repositoriesService.productsService.getProduct(params.id);
      })
    );
  }

  createProduct() {

  }
  updateProduct() {
  }
  deleteProduct() {
  }

}
