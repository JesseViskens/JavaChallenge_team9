import { Injectable } from '@angular/core';
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {Zaal} from "../models/zaal.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ZaalService {
  zalen: Zaal[];

  constructor(private http: HttpClient) { }

  async deleteZaal(zaalId:string){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json');
      return await this.http.delete(Config.host + `/zalen/` + zaalId, {headers:headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  async getZalen(){
    console.log("alle zalen halen!");
    try{
      let result: any = await this.http.get(Config.host + "/zalen").toPromise();
      this.zalen = result.obj;
      console.log(result);
      return this.zalen;
    }catch(err){
      console.log(err);
    }
  }
}