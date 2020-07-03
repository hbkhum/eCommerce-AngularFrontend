import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/core/models/product.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MatTableDataSource} from '@angular/material';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  // products$: Observable<Product[]>;
  index = -1;
  displayedColumns: string[] = ['description', 'title', 'price', 'actions'];
  constructor(
    private repositoriesService: RepositoriesService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog
    ) { }

  ngOnInit( ) {
    this.fetchProducts();
  }
  openDialog(message: string, product: any): void {
    if (message === 'Create a New Product') {
      product = {
        productId: null,
        title: '',
        description: '',
        price : 0,
        productImage: null
      }
    }
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: {message, product},
    });
    this.index = this.products.indexOf(product);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== true){
        if (this.index !== -1) {
          this.products[this.index] =  JSON.parse(JSON.stringify(result));
          this.products =  [...this.products];
        } else {
          this.products = [...this.products, result];
          // this.products.push(JSON.parse(JSON.stringify(result)));
        }
      }

      // console.log(result);
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  fetchProducts() {
    this.spinnerService.show();
    this.repositoriesService.productsService.getAllProducts()
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

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {title: 'Confirmation to delete the element?', message: 'Are you sure to delete the element'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        this.repositoriesService.productsService.deleteProduct(product.productId)
        .subscribe(data => {
          if (data === true){
            const index = this.products.indexOf(product);
            this.products.splice(index, 1);
            this.products =  [...this.products];
            this.toastr.warning('Product Deleted Successfully', 'Product');
          }
        });
      }
    });


  }

}
