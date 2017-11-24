import { Injectable } from '@angular/core';
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {Zaal} from "../models/zaal.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ZaalService {

  constructor(private http: HttpClient) { }

  async deleteZaal(zaal:Zaal){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json');
      return await this.http.delete(Config.host + `/zalen/` + zaal.id, headers).toPromise();
    }catch(err){
      console.log(err);
    }
  }
}
