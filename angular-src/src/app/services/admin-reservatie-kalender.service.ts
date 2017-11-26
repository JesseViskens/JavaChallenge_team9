import { Injectable } from "@angular/core";
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Reservatie} from "../models/reservatie.model";

export class Priority {
  text: string;
  id: number;
  color: string;
}

export class Resource {
  text: string;
  id: number;
  color: string;
}

export class Appointment {
  text: string;
  ownerId: string;
  priority: number;
  startDate: Date;
  endDate: Date;
  reden: string;
  confirmed: boolean;

  constructor(data:any){
    this.text = data.text;
    this.ownerId = data.ownerId;
    this.priority = data.priority;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.reden = data.reden;
    this.confirmed = data.confirmed;
  }
}

let prioritiesData: Priority[] = [
  {
    text: "Low Priority",
    id: 1,
    color: "#1e90ff"
  }
];

let resourcesData: Resource[] = [
  {
    text: "Samantha Bright",
    id: 1,
    color: "#cb6bb2"
  }
];

let appointments: Appointment[] = [new Appointment({
  "text": "Google AdWords Strategy",
  "ownerId": [2],
  "startDate": new Date(2017, 4, 1, 9, 0),
  "endDate": new Date(2017, 4, 1, 10, 30),
  "priority": 1
})];

@Injectable()
export class AdminReservatieKalenderService {
  reservaties: Reservatie[];

  constructor(private http: HttpClient) {
  }

  async getReservaties() {
    console.log("alle reservaties halen! [admin]");
    try {
      console.log(Config.host);
      let result: any = await this.http.get(Config.host + "/reservaties").toPromise();
      this.reservaties = result.obj;
      console.log(this.reservaties);
      return this.reservaties;
    } catch (err) {
      console.log(err);
    }
  }
  getAppointments(){
    return appointments;
  }
  getPriorities() {
    return prioritiesData;
  }
  getResources() {
    return resourcesData;
  }
}
