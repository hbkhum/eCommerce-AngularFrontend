import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './components/nav/nav.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    NavComponent,
    ProductListComponent,
    ProductFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule
  ],
  entryComponents: [
    ProductFormComponent,
    ConfirmationDialogComponent
  ],
})
export class AdminModule { }
