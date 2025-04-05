import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthenticationService, private route: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticateUser()) {
      if (state.url.includes('login')) {
        this.route.navigate(['/vm_creation']);
        return false;
      }else{
        return true;
      }
      
    } else {
      if (state.url.includes('login')) {
        return true;
      }else{
        this.route.navigate(['/login']);
        return false;
      }
    }
  }

}
