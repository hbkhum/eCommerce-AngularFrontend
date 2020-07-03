import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './core/services/token/token.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request);
  }
  private addToken(request: HttpRequest<any>) {
    const token = this.token.getToken();
    // console.log(token, 'token');
    if (token) {
      /*request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });*/
      if (request.body instanceof FormData){
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Accept': 'multipart/form-data,application/json'
            }
        });
      } else {
        request = request.clone(
          {
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          });
        }
      return request;
    } else {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    return request;
  }
}


