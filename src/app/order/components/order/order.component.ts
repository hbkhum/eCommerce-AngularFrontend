import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor(
    private repositoriesService: RepositoriesService,) {
      this.products$ = this.repositoriesService.cartService.cart$;
     }

  ngOnInit() {
  }

}
