import { Injectable } from "@angular/core";
import Config from "../config";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Reservatie} from "../models/reservatie.model";
import {ReservatieComponent} from "../components/reservatie/reservatie.component";

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
}

let prioritiesData: Priority[] = [
  {
    text: "Low Priority",
    id: 1,
    color: "#1e90ff"
  }, {
    text: "High Priority",
    id: 2,
    color: "#ff9747"
  }
];

let resourcesData: Resource[] = [
  {
    text: "Samantha Bright",
    id: 1,
    color: "#cb6bb2"
  }, {
    text: "John Heart",
    id: 2,
    color: "#56ca85"
  }, {
    text: "Todd Hoffman",
    id: 3,
    color: "#1e90ff"
  }, {
    text: "Sandra Johnson",
    id: 4,
    color: "#ff9747"
  }
]

let appointments: Appointment[] = [ {
  "text": "Testje",
  "ownerId": "1",
  "startDate": new Date(2017, 4, 3, 11, 45),
  "endDate": new Date(2017, 4, 3, 13, 45),
  "priority": 2
},   {
  "text": "Prepare Shipping Cost Analysis Report",
  "ownerId": "4",
  "startDate": new Date(2017, 4, 10, 12, 30),
  "endDate": new Date(2017, 4, 10, 13, 30),
  "priority": 1
}];

@Injectable()
export class reservatieKalenderService {
  reservaties : Reservatie[];
  constructor(private http: HttpClient) { }

  async getReservaties(){
    console.log("alle reservaties halen!");
    try{
      console.log(Config.host);
      let result: any = await this.http.get(Config.host + "/reservaties").toPromise();
      this.reservaties = result.obj;
      console.log(this.reservaties);
      return this.reservaties;
    }catch(err){
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
