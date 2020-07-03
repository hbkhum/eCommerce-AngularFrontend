import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName = new BehaviorSubject<string>(null);
  private isLogged = new BehaviorSubject<boolean>(null);
  userName$ = this.userName.asObservable();
  isLogged$ = this.isLogged.asObservable();
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  createUser(email: string, password: string) {
    // return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  login(userName: string, password: string) {
    const url = `${environment.url_api}/auth/login`;
    const body = JSON.stringify({
      userName,
      password
    });
    return this.http.post(url, body )
    .pipe(
      tap( (data: {
          token: string,
          refreshToken: string,
          authorities: any
        }) => {
        const token = data.token;
        const authorities = data.authorities;
        const refreshToken = data.refreshToken;
        this.token.saveToken(token);
        this.token.saveUserName(userName);
        this.token.saveRefreshToken(refreshToken);
      })
    );
  }

  logout() {
    this.token.removeAll();
    this.load();
  }

  load() {
    const token = this.token.getToken();
    const userName = this.token.getUserName();
    const isLogged = token === null ? false : true;
    this.userName.next(userName);
    this.isLogged.next(isLogged);
    return isLogged;
  }

  hasUser(): Observable<boolean> {
    return of(this.load());
  }

  /*getInfo() {
    // const userName = this.token.getUserName();
    this.hasUser().pipe(
      map(user => user === null ? false : true),
      tap(hasUser => {
        if (hasUser) {
          const userName = this.token.getToken();
          this.userName.next(userName);
          this.isLogged.next(hasUser);
          // this.router.navigate(['/auth/login']);
        }
      }),
    );

    // this.userName.next(userName);
  }
  /*getStatus() {
    const userName = this.token.getUserName();
    this.userName.next(userName);
  }*/




}
