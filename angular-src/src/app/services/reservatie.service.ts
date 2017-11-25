import { Injectable } from '@angular/core';
import {Zaal} from "../models/zaal.model";
import Gebruiker from "../models/gebruiker.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Config from "../config";
import {Reservatie} from "../models/reservatie.model";
import DateTimeFormat = Intl.DateTimeFormat;
import autoBind from 'auto-bind';

@Injectable()
export class ReservatieService {
  reservatie:Reservatie;

  constructor(private http: HttpClient) {
    autoBind(this);
  }

  async reserveer(reservatie:Reservatie){
    console.log("Reserveren..." + reservatie);
    try{
      console.log(localStorage.getItem("authKey"));
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.post(Config.host + "/reservaties", reservatie, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

}
