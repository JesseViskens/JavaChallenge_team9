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

  //Gebruiker// nieuwe reservatie aanvragen
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
  //Admin// reservatie ophalen
  async getReservatie(reservatieId:string){
    console.log("reservatie ophalen");
    try{
      let result: any = await this.http.get(Config.host + "/reservaties/" + reservatieId).toPromise();
      this.reservatie = result.obj;
      console.log(result);
      return this.reservatie;
    }catch(err){
      console.log(err);
    }
  }

  //Admin// reservatie accepteren
  async acceptReservatie(reservatie:Reservatie){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.patch(Config.host + "/reservaties/" + reservatie.id, reservatie, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  async weigerReservatie(id: string, reden: string){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      console.log('delete');
      return await this.http.delete(Config.host + `/reservaties/` + id, {headers:headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }
}
