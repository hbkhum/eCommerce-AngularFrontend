import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupProductsPipe } from './pipes/groupProducts/group-products.pipe';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GroupProductsPipe,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GroupProductsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
