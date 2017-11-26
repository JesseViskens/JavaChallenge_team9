import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //used to check if person is logged in and if they are admin
  isAdmin: boolean;
  isLoggedin: boolean;
  constructor(private service: AuthService, private router: Router) {
    //check on initialize
    this.isLoggedin = service.isLoggedIn();
    this.isAdmin = service.isAdmin();
    //eventemmitters in Auth.service send warning when logged in or logged out
    service.onLogin.subscribe(loggedIn => this.isLoggedin = service.isLoggedIn());
    service.onLogout.subscribe(loggedIn => this.isLoggedin = service.isLoggedIn());
    service.onLogin.subscribe(loggedIn => this.isAdmin = service.isAdmin());
    service.onLogout.subscribe(loggedIn => this.isAdmin = service.isAdmin());

  }

  ngOnInit() {
  }
  //when they log out, clear local storage and go to login page
  onLogout(){
    console.log("logout");
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
