import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {       
        this.router.navigate(['']);
        return false;
    }

    const expectedRole = route.data['expectedRole'];
    
    if (!this.auth.isPermissaoAcesso(expectedRole)) {
        this.router.navigate(['home']);
        return false;
    }

    return true;
  }

}
