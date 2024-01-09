import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent  implements OnInit {
  
  //Configuracion Boton
  @Input() color: string = "warning";
  @Input() class!: string;
  @Input() expand!: string;
  @Input() mode: string = "ios";
  @Input() type!: string;
  @Input() fill: string = "solid";
  @Input() routerLink!: "string";

  //Texto Boton
  @Input() textButton!: string;

  //Icono
  @Input() icon!: string;


  constructor() { }

  ngOnInit() {}

}
