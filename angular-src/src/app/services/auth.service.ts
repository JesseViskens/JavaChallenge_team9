import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Gebruiker from '../models/gebruiker.model';
import autoBind from 'auto-bind';
import Config from "../config";


@Injectable()
export class AuthService {
  //voor communicatie met api-code

  onLogout: EventEmitter<Gebruiker> = new EventEmitter();
  onLogin: EventEmitter<Gebruiker> = new EventEmitter();
  onUserFetched: EventEmitter<Gebruiker> = new EventEmitter();

  gebruiker:Gebruiker;

  constructor(private http: HttpClient) {
    autoBind(this);
  }

  isLoggedIn(){
    if (localStorage.getItem("authKey")){
      return true;
    }
    return false;
  }

  isAdmin(){
    if (localStorage.getItem("isAdmin")){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.clear();
    this.onLogout.emit();
  }

  async getUser(gebruikerId:string){
    try{
      console.log("Getting user");
      let result: any = await this.http.get(Config.host + "/gebruikers/" + gebruikerId).toPromise();
      this.gebruiker = result.obj;
      console.log(result);
      return this.gebruiker;
    }catch(err){
      console.log(err);
    }
  }

  async login(email: string, password: string){
    console.log("Logging in");
    console.log(email);
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json');
      let result: any = await this.http.post(Config.host + "/auth/signin", {email, password},{headers:headers}).toPromise();
      this.gebruiker = new Gebruiker(result.user);
      console.log(this.gebruiker);
      localStorage.setItem("authKey", result.token);
      localStorage.setItem("userId", result.user._id);
      if(this.gebruiker.isAdmin){
        localStorage.setItem("isAdmin", "yes");
      }
      this.onLogin.emit(this.gebruiker);
      return true;
    }catch(err){
      console.log(err);
      return false;
    }
  }

}
