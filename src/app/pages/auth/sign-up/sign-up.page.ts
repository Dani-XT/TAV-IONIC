import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; 
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';
import { UserController } from 'src/app/utils/user-controller';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  apiSvc = inject(ApiService);
  utilsSvc = inject(UtilsService);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor( ) { }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      const tempUser = this.form.value

      this.apiSvc.createUser(tempUser as User)
      .subscribe(
        response => {
          this.utilsSvc.presentToast({
            message: "Usuario creado exitosamente",
            duration: 1500,
            color: "success",
            position: "bottom",
            icon: "checkmark-circle-outline"
          });
          this.utilsSvc.routerLink('/main/home');
        },
        async error => {
          const flags =  await this.createTempUser();
          if (flags) {
            console.log("true");
            this.utilsSvc.saveInLocalStorage('user', tempUser);
            this.utilsSvc.presentToast({
              message: "Usuario creado exitosamente",
              duration: 1500,
              color: "success",
              position: "bottom",
              icon: "checkmark-circle-outline"
            });
            this.utilsSvc.routerLink('/main/home');
          } else {
            console.log('Error al crear usuario', error);
            this.utilsSvc.presentToast({
              message: "Error al crear usuario",
              duration: 1500,
              color: "danger",
              position: "bottom",
              icon: "checkmark-circle-outline"
            });
          }
        }
      );
    } else {
      console.error('Form is invalid');
      this.utilsSvc.presentToast({
        message: "Formulario invalido",
        duration: 1500,
        color: "warning",
        position: "bottom",
        icon: "checkmark-circle-outline"
      });
      
    }
  }

  createTempUser(): Promise<boolean> {
    return new Promise((resolve) => {
      this.utilsSvc.presentAlert ({
        header: 'Usuario Temporal',
        message: 'Tenemos problemas con el servidor ¿Quieres crear un usuario temporal?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          }, {
            text: 'Aceptar',
            handler: () => {
              resolve(true);
            },
          },

        ],
      });
    });
  }

}
