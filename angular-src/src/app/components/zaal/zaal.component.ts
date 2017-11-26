import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-zaal',
  templateUrl: './zaal.component.html',
  styleUrls:[ './zaal.component.css']
})

export class ZaalComponent {
  @Input() zaal: Zaal;
  isAdmin:boolean;

  constructor(private service: AuthService) {
    this.isAdmin = service.isAdmin();
    service.onLogin.subscribe(loggedIn => this.isAdmin = service.isAdmin());
    service.onLogout.subscribe(loggedIn => this.isAdmin = service.isAdmin());
  }

}
