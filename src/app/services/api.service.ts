import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.urlBase;
  private endpoint = environment.endpoints.users;

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const url = `${this.apiUrl}/${this.endpoint}/register`;
    const headers = new HttpHeaders().set('x-tenant-id', '65a08d5f8dbd709da49b2fdb');
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };

    const request = this.http.post(url, body, { headers });
    console.log(request);
    return request;
  }

  loginUser(email: string, password: string) {
    const url = `${this.apiUrl}/${this.endpoint}/login`;
    const headers = new HttpHeaders().set('x-tenant-id', '65a08d5f8dbd709da49b2fdb');
    const body = {
      email,
      password
    };

    const request = this.http.post(url, body, { headers });

    return request;
  }
}
