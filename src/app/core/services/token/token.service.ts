import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  removeRefreshToken() {
    localStorage.removeItem('refreshToken');
  }

  saveUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }
  getUserName() {
    return localStorage.getItem('userName');
  }
  removeUserName() {
    localStorage.removeItem('userName');
  }

  saveAuthorities(authorities: any) {
    localStorage.setItem('authorities', authorities);
  }
  getAuthorities() {
    return localStorage.getItem('authorities');
  }
  removeAuthorities() {
    localStorage.removeItem('authorities');
  }

  removeAll(){
    this.removeRefreshToken();
    this.removeToken();
    this.removeUserName();
    this.removeAuthorities();
  }

}
