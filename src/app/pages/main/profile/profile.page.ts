import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UpdateDelUserComponent } from 'src/app/shared/components/update-del-user/update-del-user.component';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user : User;

  apiSvc = inject(ApiService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  ionViewWillEnter() {
    this.getUser();
    console.log("dentro del ionViewWillEnter");
    console.log(this.user);
  }

  

  async updateOrDelUser(user: User) {
    let res = await this.utilsSvc.presentModal({
      component: UpdateDelUserComponent,
      componentProps: { user },
      cssClass: 'update-del-user'
    });

    if (res && res.succes) {
      this.getUser()
    }
  }

  getUser() {
    let sub = this.apiSvc.getUser()
    .subscribe({
      next: (response: User) => {
        console.log("dentro del getUser")  
        console.log(response);
        this.user = response;
          
        console.log(this.user);
        console.log(response)
        sub.unsubscribe();
      }
    })
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
