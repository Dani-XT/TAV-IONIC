import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    CustomButtonComponent
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    CustomButtonComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
