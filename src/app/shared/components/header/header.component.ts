import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() color : string = "primary";
  @Input() title! : string;
  @Input() subtitle! : string;
  constructor() { }

  ngOnInit() {}

}
