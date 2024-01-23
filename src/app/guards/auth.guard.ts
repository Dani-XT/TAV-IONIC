import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  apiSvc = inject(ApiService);
  utilsSvc = inject(UtilsService);
  
  
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      console.log("hola")
      
      return true;
  }
  
}
