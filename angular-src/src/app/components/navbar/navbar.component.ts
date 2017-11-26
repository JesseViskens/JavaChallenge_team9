import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean;
  isLoggedin: boolean;
  constructor(private service: AuthService, private router: Router) {
    this.isLoggedin = service.isLoggedIn();
    this.isAdmin = service.isAdmin();
    service.onLogin.subscribe(loggedIn => this.isLoggedin = service.isLoggedIn());
    service.onLogout.subscribe(loggedIn => this.isLoggedin = service.isLoggedIn());
    service.onLogin.subscribe(loggedIn => this.isAdmin = service.isAdmin());
    service.onLogout.subscribe(loggedIn => this.isAdmin = service.isAdmin());

  }

  ngOnInit() {
  }
  onLogout(){
    console.log("logout");
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
