import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Activities, Task } from 'src/app/models/task.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task;
  user = {} as User;

  form = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    activities: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor( ) { }

  utilsSvc = inject(UtilsService);
  apiService = inject(ApiService);

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

    if(this.task){
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
  }

  submit() {
    if(this.form.valid){
      if(this.task){
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  createTask(){

    this.utilsSvc.presentLoading();
    delete this.form.value._id;

    if(this.form.valid) {
      this.apiService.createTask(this.form.value as Task)
      .subscribe(
        response => {
          this.utilsSvc.dismissModal({succes: true});
          this.utilsSvc.presentToast({
            message: 'Tarea creada exitosamente',
            color: 'succes',
            icon: 'checkmark-circle-outline',
            duration: 1500
          });

          this.utilsSvc.dismissLoading
        },
        error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: 'Error al crear tarea',
            color: 'danger',
            icon: 'alert-circle-outline',
            duration: 1500
          });
          this.utilsSvc.dismissLoading();
        }
      )
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

  updateTask(){

    this.utilsSvc.presentLoading();
    delete this.form.value._id;

    if(this.form.valid) {
      this.apiService.updateTask(this.form.value as Task)
      .subscribe(
        response => {
          this.utilsSvc.dismissModal({succes: true});
          this.utilsSvc.presentToast({
            message: 'Tarea creada exitosamente',
            color: 'succes',
            icon: 'checkmark-circle-outline',
            duration: 1500
          });

          this.utilsSvc.dismissLoading
        },
        error => {
          console.log(error);
          this.utilsSvc.presentToast({
            message: 'Error al crear tarea',
            color: 'danger',
            icon: 'alert-circle-outline',
            duration: 1500
          });
          this.utilsSvc.dismissLoading();
        }
      )
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

  getPercentage(){
    return this.utilsSvc.getPercentage(this.form.value as Task);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.activities = ev.detail.complete(this.form.value.activities);
    this.form.updateValueAndValidity();
  }

  removeActivities(index: number) {
    this.form.value.activities.splice(index,1);
    this.form.controls.activities.updateValueAndValidity();
  }

  createActivities(){
    this.utilsSvc.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs: [{
        name: 'name',
        type: 'textarea',
        placeholder: 'Hacer algo'
      }],
      buttons: [{
          text:'Cancelar',
          role:'cancel',
      },{
        text: 'Agregar',
        handler: (res) => {
          let item: Activities = {name: res.name, finished: false};
          this.form.value.activities.push(item);
          this.form.controls.activities.updateValueAndValidity();
        }
      }]
    })
  }

}