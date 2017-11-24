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

  async reserveer(beginuur: String, einduur: String, zaal: Zaal, gebruiker: Gebruiker, reden: String){
    console.log("Reserveren..." + reden);
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json');
      let result: any = await this.http.post(Config.host + "/reservaties", {beginuur, einduur, zaal, gebruiker, reden},{headers:headers}).toPromise();
      this.reservatie = new Reservatie(result);
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }

}
