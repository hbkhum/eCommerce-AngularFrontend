import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupProducts'
})
export class GroupProductsPipe implements PipeTransform {

  groupedProducts: any[] = [];
  transform(value: any[]): any {
    value.forEach(product => {
      if (!this.groupedProducts.find(p => p.productId === product.productId)) {
        product.quantity = 1;
        this.groupedProducts.push(product);
      } else {
        this.groupedProducts.find(p => p.productId === product.productId).quantity += 1;
      }
    });
    return this.groupedProducts;
  }

}
