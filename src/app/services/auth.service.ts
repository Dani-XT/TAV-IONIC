import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    console.log(!!localStorage.getItem('user-token'))
    return !!localStorage.getItem('user-token');
  }

}
