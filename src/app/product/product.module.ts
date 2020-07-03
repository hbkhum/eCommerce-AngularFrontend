import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductContainer } from './containers/product/product.container';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductContainer
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    MaterialModule
  ]
})
export class ProductModule { }
