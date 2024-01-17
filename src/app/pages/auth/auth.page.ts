import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { ApiService } from 'src/app/services/api.services'

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

  constructor() { }

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const email = this.form.value.email as string;
      const password = this.form.value.password as string;
      
      this.apiSvc.loginUser(email, password)
      .subscribe(
        response => {
          this.utilsSvc.saveInLocalStorage('user', response);
          this.utilsSvc.routerLink('/main/home');
          console.log('User autenthicated successfully:', response);
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
      
    }
  }
}