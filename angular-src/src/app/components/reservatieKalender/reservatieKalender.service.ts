import { Injectable } from "@angular/core";

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
  ownerId: number[];
  priority: number;
  startDate: Date;
  endDate: Date;
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

let appointments: Appointment[] = [{
  "text": "Google AdWords Strategy",
  "ownerId": [2],
  "startDate": new Date(2017, 4, 1, 9, 0),
  "endDate": new Date(2017, 4, 1, 10, 30),
  "priority": 1
}, {
  "text": "New Brochures",
  "ownerId": [1],
  "startDate": new Date(2017, 4, 1, 11, 30),
  "endDate": new Date(2017, 4, 1, 14, 15),
  "priority": 2
},  {
  "text": "Approve Hiring of John Jeffers",
  "ownerId": [2],
  "startDate": new Date(2017, 4, 3, 10, 0),
  "endDate": new Date(2017, 4, 3, 11, 15),
  "priority": 2
}, {
  "text": "Update NDA Agreement",
  "ownerId": [1],
  "startDate": new Date(2017, 4, 3, 11, 45),
  "endDate": new Date(2017, 4, 3, 13, 45),
  "priority": 2
}, {
  "text": "Update Employee Files with New NDA",
  "ownerId": [2],
  "startDate": new Date(2017, 4, 3, 14, 0),
  "endDate": new Date(2017, 4, 3, 16, 45),
  "priority": 1
}, {
  "text": "Submit Questions Regarding New NDA",
  "ownerId": [1],
  "startDate": new Date(2017, 4, 4, 8, 0),
  "endDate": new Date(2017, 4, 4, 9, 30),
  "priority": 1
}, {
  "text": "Recall Rebate Form",
  "ownerId": [1],
  "startDate": new Date(2017, 4, 8, 12, 45),
  "endDate": new Date(2017, 4, 8, 13, 15),
  "priority": 1
},  {
  "text": "Prepare Shipping Cost Analysis Report",
  "ownerId": [4],
  "startDate": new Date(2017, 4, 10, 12, 30),
  "endDate": new Date(2017, 4, 10, 13, 30),
  "priority": 1
}];

@Injectable()
export class Service {
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
