import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  user = {} as User;


  apiSvc = inject(ApiService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  nombre : string = "Nombre Usuario";
  correo : string = "Correo Usuario";

  ngOnInit() {
  }


  getUser() {
    return this.user = this.utilsSvc.getFromLocalStorage('user');
  }

}
