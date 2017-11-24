import { Injectable } from '@angular/core';
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {Zaal} from "../models/zaal.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ZaalService {
  zalen: Zaal[];
  zaal: Zaal;
  zaalId: string;

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

  async getZaal(zaalId:string){
    console.log("één zaal halen");
    try{
      let result: any = await this.http.get(Config.host + "/zalen/" + zaalId).toPromise();
      this.zaal = result.obj;
      console.log(result);
      return this.zaal;
    }catch(err){
      console.log(err);
    }
  }
}
