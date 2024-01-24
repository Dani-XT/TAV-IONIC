import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { UpdateDelUserComponent } from './components/update-del-user/update-del-user.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    CustomButtonComponent,
    AddUpdateTaskComponent,
    UpdateDelUserComponent
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    CustomButtonComponent,
    NgCircleProgressModule,
    AddUpdateTaskComponent,
    UpdateDelUserComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ]
})
export class SharedModule { }
