import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError, concat } from 'rxjs';
import { catchError, map, tap, finalize, retryWhen, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ProductImage } from '../../models/product-image.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsImagesService {

  constructor(
    private http: HttpClient
  ) { }

  getProductImage(id: string) {
    const url = `${environment.url_api}/productImages/${id}`;
    return this.http.get<ProductImage>(url).pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            delay(3000), take(2)
          );
      }),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      finalize(() => console.log('first finalize() block executed'))
    );
  }

  createProductImage(productImage: ProductImage) {
    const url = `${environment.url_api}/productImages`;
    //const body = JSON.stringify(product);
    const formData: FormData = new FormData();
    formData.append('fileImageAtt', productImage.fileImageAtt);
    formData.append('Product.productId', productImage.productId);
    return this.http.post<ProductImage>(url, formData).pipe(
      // map(response => response.productId),
      retryWhen(errors => {
        return errors
          .pipe(
            delay(3000), take(2), o => concat(o, throwError(errors))
          );
      }),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      finalize(() => console.log('first finalize() block executed')),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of(false);
      }),
      finalize(() => console.log('# finalize() block executed'))
    );
  }

  deleteImage(id: string) {
    const url = `${environment.url_api}/productImages/${id}`;
    return this.http.delete<boolean>(url).pipe(
      map(result => result),
      retryWhen(errors => {
        return errors
          .pipe(
            delay(3000), take(2)
          );
      }),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      finalize(() => console.log('first finalize() block executed')),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of(false);
      }),
      finalize(() => console.log('# finalize() block executed'))
    );
  }
}
