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

  apiSvc = inject(ApiService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return this.user = this.utilsSvc.getFromLocalStorage('user');
    

    
  }

  signOut() {
    this.utilsSvc.presentAlert ({
      header: 'Cerrar sesion',
      message: '¿Quieres cerrar sesion?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Si, cerrar',
          handler: () => {
            this.apiSvc.signOut();
          }
        }

      ]
    });
  }

}
