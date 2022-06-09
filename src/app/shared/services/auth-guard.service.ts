import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  canActivate(): boolean {
    if( this.cookieService.get('access_token') == '' ) {
      this.router.navigate(['../login'], { relativeTo: this.route });
      return false;
    }
    return true;
  }
}
