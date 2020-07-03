import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [ComponentsComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
