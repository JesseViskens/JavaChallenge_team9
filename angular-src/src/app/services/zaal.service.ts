import { Injectable } from '@angular/core';
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {Zaal} from "../models/zaal.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ZaalService {
  zalen: Zaal[];
  deelzalen: Zaal[];
  zaal: Zaal;
  zaalId: string;

  constructor(private http: HttpClient) { }

  // delete a zaal from the list
  async deleteZaal(zaalId:string){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      console.log('delete');
      return await this.http.delete(Config.host + `/zalen/` + zaalId, {headers:headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  // get all the zalen that are in the database
  async getZalen(){
    console.log("alle zalen halen!");
    try{
      let result: any = await this.http.get(Config.host + "/zalen").toPromise();
      this.zalen = result.obj;
      return this.zalen;
    }catch(err){
      console.log(err);
    }
  }

  // get one perticular zaal
  async getZaal(zaalId:string){
    console.log("één zaal halen");
    try{
      let result: any = await this.http.get(Config.host + "/zalen/" + zaalId).toPromise();
      this.zaal = result.obj;
      return this.zaal;
    }catch(err){
      console.log(err);
    }
  }

  // get all deelzalen of one perticular zaal
  async getDeelZalen(zaalId:string){
    console.log("deelzalen van één zaal ophalen");
    try{
      let result: any = await this.http.get(Config.host + "/zalen/" + zaalId + "/deelzalen").toPromise();
      this.deelzalen = result.obj;
      return this.deelzalen;
    }catch(err){
      console.log(err);
    }
  }

  // create a new zaal
  async createZaal(zaal:Zaal){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.post(Config.host + "/zalen", zaal, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  // update an existing zaal object
  async updateZaal(zaal:Zaal){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.patch(Config.host + "/zalen/" + zaal._id, zaal, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  // add a deelzaal to the list of deelzalen van zaal
  async updateDeelzalen(zaal:Zaal, deelZaal:Zaal){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.patch(Config.host + "/zalen/" + zaal._id + "/zaal/" + deelZaal._id, deelZaal, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

  // delete deelzalen van zaal
  async deleteDeelzalen(zaal:Zaal){
    try{
      let headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", localStorage.getItem("authKey"));
      return await this.http.patch(Config.host + "/zalen/" + zaal._id + "/deletedeelzalen", zaal, {headers}).toPromise();
    }catch(err){
      console.log(err);
    }
  }

}
