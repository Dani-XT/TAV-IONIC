import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  form = new FormGroup({
    titulo : new FormControl('', [Validators.required]),
    descripcion : new FormControl('', [Validators.required]),
  });

  constructor() { }

  

  ngOnInit() {
  }

}
