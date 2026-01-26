import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor (
    private router: Router, 
    private authService: AuthenticationService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    
    return this.router.createUrlTree(['login'],  {
      queryParams: { returnUrl: state.url }
    });
    
  }

  
}
