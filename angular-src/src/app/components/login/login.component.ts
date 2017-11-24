import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Gebruiker from "../../models/gebruiker.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password:new FormControl(null, Validators.required)
    })
  }
    onSubmit(){
      this.authService.login(
        this.myForm.value.email,
        this.myForm.value.password)
        .subscribe(
          data => {
            localStorage.setItem('userId', data.userId);
            this.router.navigateByUrl('/');
          },
          error => console.log(error)
        );
      this.myForm.reset();
    }
}
