import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName$: Observable<string>;
  authorities: any;
  isLogged$: Observable<boolean>;

  total$: Observable<string>;
  constructor(
    private router: Router,
    private repositoriesService: RepositoriesService) {
      this.total$ = this.repositoriesService.cartService.cart$
      .pipe(
        map(products => products.length.toString() )
      );
    }

  ngOnInit() {
    this.isLogged$ = this.repositoriesService.authService.isLogged$;
    this.userName$ = this.repositoriesService.authService.userName$;
  }
  logOut() {
    this.repositoriesService.authService.logout();
  }

  onEnabledEmp() {
    // const i = this.repositoriesService.token.getAuthorities().find(x => x.authority === 'ROLE_ADMIN');
    // const i = this.repositoriesService.token.getAuthorities();
    // console.log(i);
    return true;
  }

}
