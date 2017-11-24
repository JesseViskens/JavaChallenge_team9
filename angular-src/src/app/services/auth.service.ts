import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  logout(){
    localStorage.clear();
    this.onLogout.emit();
  }

  async getUser(){
    try{
      console.log("Getting user");
      let result:any= await this.http.get(Config.host + "/auth", HttpHelper.getOptions()).toPromise();
      this.gebruiker = new Gebruiker(result);
      this.onUserFetched.emit(this.gebruiker);
    }catch(err){
      HttpHelper.onError(err);
    }
  }

  async login(email: string, password: string){
    console.log("Logging in");
    try{
      let result: any = await this.http.post(Config.host + "/auth/login", {email, password},{headers:HttpHelper.getHeadersNoAuth()}).toPromise();
      localStorage.setItem("authKey", result.token);
      this.gebruiker = new Gebruiker(result);
      this.onLogin.emit(this.gebruiker);
    }catch(err){
      console.log(err);
    }
  }

}