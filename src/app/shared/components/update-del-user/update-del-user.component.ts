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

  utilsSvc = inject(UtilsService);
  apiSvc = inject(ApiService);

  constructor() { }

  ngOnInit() {}

  submit() {

  }

  delete() {
    
  }

}
