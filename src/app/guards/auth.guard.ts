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
    return true;
  }
  
}


// export class AuthGuard implements CanActivate {
  
//   constructor(
//     private firebaseSvc: FirebaseService,
//     private utilsSvc: UtilsService
//   ) {

//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       return this.firebaseSvc.getAuthState().pipe(map(auth => {
//         // Existe usuario autenticado
//         if(auth) {
//           return true;
//         } else {
//           // No existe usuario autenticado
//           this.utilsSvc.routerLink('/auth');
//           return false;
//         }
//       }));
//   }
// }
