import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter() ;

  today = new Date();
  constructor(private repositoriesService: RepositoriesService,) {
   }

  ngOnInit() {
     // console.log('Init');
  }

  addCart() {
    this.repositoriesService.cartService.addCart(this.product);
    // console.log('add cart');
    // this.productClicked.emit (this.product.productId);
  }

}
