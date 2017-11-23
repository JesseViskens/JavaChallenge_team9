import { Component, OnInit } from '@angular/core';
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private testService:TestService) { }

  ngOnInit() {
  }

}
