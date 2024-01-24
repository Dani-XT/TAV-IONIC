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
          console.log("response")
          this.utilsSvc.dismissLoading();
        },
        error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: 'Error al modificar usuario',
            color: 'danger',
            icon: 'alert-circle-outline',
            duration: 1500
          });
          console.log("error")
          this.utilsSvc.dismissLoading();
        }
      )
    }
  }

  deleteUser(user: User) {
    this.utilsSvc.presentLoading();
    this.apiSvc.deleteUser()
    .subscribe(
      response => {

      }
    )
  }

}
