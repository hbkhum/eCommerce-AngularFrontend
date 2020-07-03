import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { Observable, of, throwError, concat } from 'rxjs';
import { catchError, map, tap, finalize, retryWhen, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    // ?orderBy=title&direction=DESC&page=0&pageSize=10
    const url = `${environment.url_api}/products/?orderBy=title&direction=DESC&page=0&pageSize=10`;
    return this.http.get<any>(url).pipe(
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
        return of([]);
      }),
      finalize(() => console.log('# finalize() block executed'))
    );
  }

  getAllProductsWhitImages() {
    // ?orderBy=title&direction=DESC&page=0&pageSize=10
    const url = `${environment.url_api}/products/Images/?orderBy=title&direction=DESC&page=0&pageSize=10`;
    return this.http.get<any>(url).pipe(
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
        return of([]);
      }),
      finalize(() => console.log('# finalize() block executed'))
    );
  }

  getProduct(id: string) {
    const url = `${environment.url_api}/products/${id}`;
    return this.http.get<Product>(url).pipe(
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

  createProduct(product: Product) {
    const url = `${environment.url_api}/products`;
    const body = JSON.stringify(product);
    return this.http.post<Product>(url, body).pipe(
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
      /*catchError(err => {
        console.log('caught rethrown error, providing fallback value');
        return of(Product);
      }),
      finalize(() => console.log('# finalize() block executed'))*/
    );
  }

  updateProduct(id: string, product: Product) {
    const url = `${environment.url_api}/products/${id}`;
    const body = JSON.stringify(product);
    console.log(body);
    return this.http.put<boolean>(url, body).pipe(
      // map(response => response as boolean),
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

  deleteProduct(id: string) {
    const url = `${environment.url_api}/products/${id}`;
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
