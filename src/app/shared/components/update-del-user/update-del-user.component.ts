import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-update-del-user',
  templateUrl: './update-del-user.component.html',
  styleUrls: ['./update-del-user.component.scss'],
})
export class UpdateDelUserComponent  implements OnInit {

  @Input() user: User;

  form = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    tenant_id: new FormControl(''),
  })


  constructor() { }

  utilsSvc = inject(UtilsService);
  apiSvc = inject(ApiService);


  ngOnInit() {
    this.form.setValue(this.user);
    this.form.updateValueAndValidity();
  }

  submit() {
    if(this.form.valid) {
      this.updateUser();
    }
  }

  updateUser() {
    this.utilsSvc.presentLoading();
    if(this.form.valid) {

      
      this.apiSvc.updateUser(this.form.value as User)
      .subscribe(
        response => {
          this.utilsSvc.dismissModal({succes: true});
          this.utilsSvc.presentToast({
            message: 'Usuario modificado exitosamente',
            color: 'succes',
            icon: 'checkmark-circle-outline',
            duration: 1500
          });
          this.utilsSvc.dismissLoading();
        },
        error => {
          console.log("Error al modificar usuario",error);
          this.utilsSvc.presentToast({
            message: 'Error al modificar usuario',
            color: 'danger',
            icon: 'alert-circle-outline',
            duration: 1500
          });
          this.utilsSvc.dismissLoading();
        }
      )
    }
  }

  async deleteUser(user: User) {
    this.utilsSvc.presentLoading();
    this.apiSvc.deleteUser()
    .subscribe(
      response => {
        console.log(response);
        this.utilsSvc.presentToast({
          message: 'Usuario eliminado exitosamente',
          color: 'danger',
          icon: 'checkmark-circle-outline',
          duration: 1500
        })
        this.utilsSvc.removeFromLocalStorage('user');
        this.utilsSvc.removeFromLocalStorage('user-token');
        this.utilsSvc.routerLink('/auth');
        this.utilsSvc.dismissLoading();
      },
      error => {
        console.log('Error al eliminar usuario:',error);
        this.utilsSvc.presentToast({
          message: 'Error al eliminar usuario',
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000
        });
        this.utilsSvc.dismissLoading();
      }
    )
  }

  confirmDeleteUser(user: User) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteUser(user);
          }
        }]
      });
  }

}
