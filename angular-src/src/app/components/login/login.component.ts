import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  async onSubmit() {
    let signedIn = await this.authService.login(
      this.myForm.value.email,
      this.myForm.value.password
    );

    if (signedIn){
      this.router.navigateByUrl('/');
      this.myForm.reset();
    }
  }
}
