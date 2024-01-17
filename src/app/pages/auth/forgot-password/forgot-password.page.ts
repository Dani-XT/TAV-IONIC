import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor() { }

  apiService = inject(ApiService);
  utilsSvc = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit() {
  }

  submit() {
    console.log("hola")
  }

}
