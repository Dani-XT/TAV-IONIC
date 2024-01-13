import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; 
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  apiService = inject(ApiService);
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
      this.apiService.createUser(this.form.value as User)
      .subscribe(
        response => {
          this.utilsSvc.presentToast({
            message: "Usuario creado exitosamente",
            duration: 1500,
            color: "success",
            position: "bottom",
            icon: "checkmark-circle-outline"
          });
          this.utilsSvc.saveInLocalStorage('user', response);
          this.utilsSvc.routerLink('/main/home');
        },
        error => {
          console.log('Error al crear usuario', error);
          this.utilsSvc.presentToast({
            message: "Error al crear usuario",
            duration: 1500,
            color: "danger",
            position: "bottom",
            icon: "checkmark-circle-outline"
          });
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

}
