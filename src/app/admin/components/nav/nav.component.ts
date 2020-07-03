import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { RepositoriesService } from 'src/app/core/services/repositories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      private breakpointObserver: BreakpointObserver,
      private repositoriesService: RepositoriesService,
      private router: Router
    ) {}
    logout() {
      this.repositoriesService.authService.logout();
      this.router.navigate(['./home']);
      /*this.auth.logout()
      .then(() => {
        this.router.navigate(['./home']);
      });*/
    }

}
