import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.urlBase;
  private endpointUser = environment.endpoints.users;
  private endpointTask = environment.endpoints.tasks;

  constructor(private http: HttpClient,
              private utilsSvc: UtilsService) { }


  /*TODO: USUARIOS */
  createUser(user: User) {
    const url = `${this.apiUrl}/${this.endpointUser}/register`;
    const headers = new HttpHeaders().set('x-tenant-id', '65a08d5f8dbd709da49b2fdb');
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };
    const request = this.http.post(url, body, { headers });
    return request.pipe(
      tap((response: any) => {
        this.utilsSvc.saveInLocalStorage('user', response.user);
      })
    );
  }

  loginUser(email: string, password: string) {
    const url = `${this.apiUrl}/${this.endpointUser}/login`;
    const headers = new HttpHeaders().set('x-tenant-id', '65a08d5f8dbd709da49b2fdb');
    const body = {
      email,
      password
    };
    const request = this.http.post(url, body, { headers });
    return request.pipe(
      tap((response: any) => {
        this.utilsSvc.saveInLocalStorage('user-token', response.token)
        this.utilsSvc.saveInLocalStorage('user', response.user);
      })
    );
  }

  updateUser() {
    const url = `${this.apiUrl}/${this.endpointUser}/login`;
    const headers = new HttpHeaders().set('x-tenant-id', '65a08d5f8dbd709da49b2fdb');
    const body = {
      
    };
    const request = this.http.post(url, body, { headers });
  }

  signOut() {
    // await this.auth.signOut();
    this.utilsSvc.routerLink('/auth');
    this.utilsSvc.removeFromLocalStorage('user');
  }


  /*TODO: TASK */
  getTask() {
    const token = this.utilsSvc.getFromLocalStorage('user-token');

    const url = `${this.apiUrl}/${this.endpointTask}/`;
    const headers = new HttpHeaders()
      .set('x-tenant-id', '65a08d5f8dbd709da49b2fdb')
      .set('Authorization', token);

    const request = this.http.get(url, { headers });
    return request;
  }

  createTask(task: Task) { 
    const token = this.utilsSvc.getFromLocalStorage('user-token');
    
    const url = `${this.apiUrl}/${this.endpointTask}/`;
    const headers = new HttpHeaders()
      .set('x-tenant-id', '65a08d5f8dbd709da49b2fdb')
      .set('Authorization', token);

    const body = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      state: task.state,
      activities: task.activities,
      owner: task.owner,
    };

    const request = this.http.post(url, body, { headers });
    return request;
  }


  updateTask(task: Task, taskId: string) {
    const token = this.utilsSvc.getFromLocalStorage('user-token');
    console.log(task._id);
    const url = `${this.apiUrl}/${this.endpointTask}/${taskId}`;
    const headers = new HttpHeaders()
      .set('x-tenant-id', '65a08d5f8dbd709da49b2fdb')
      .set('Authorization', token);
    const body = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      state: task.state,
      activities: task.activities,
      owner: task.owner,
    };

    const request = this.http.patch(url, body, { headers });
    return request;
  }

  deleteTask(taskId: string) {
    const token = this.utilsSvc.getFromLocalStorage('user-token');
    
    const url = `${this.apiUrl}/${this.endpointTask}/${taskId}`;
    const headers = new HttpHeaders()
      .set('x-tenant-id', '65a08d5f8dbd709da49b2fdb')
      .set('Authorization', token);

    const request = this.http.delete(url, { headers })
    return request;
  }

}


