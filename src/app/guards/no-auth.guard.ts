import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})


export class NoAuthGuard implements CanActivate {

  authSvc = inject(AuthService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let auth = this.authSvc.isAuthenticated();
      if (!auth) {
        return true;
      } else {
        this.utilsSvc.routerLink('/main/home');
        return false;
      }
  }
  
}
