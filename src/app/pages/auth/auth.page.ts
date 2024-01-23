import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  utilsSvc = inject(UtilsService);
  apiSvc = inject(ApiService);

  constructor() { }

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      const tempUser = this.form.value;
      
      this.apiSvc.loginUser(email, password)
      .subscribe(
        response => {
          this.utilsSvc.routerLink('/main/home');
          console.log('User autenthicated successfully:', response);
        },
        error => {
          console.error('Error auth user:', error);
          this.utilsSvc.presentToast({
            message: "Error al ingresar",
            duration: 1500,
            color: "danger",
            position: "bottom",
            icon: "checkmark-circle-outline"
          });
        }
      );

      
      
    }
  }
}

