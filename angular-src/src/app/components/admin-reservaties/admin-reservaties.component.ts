import {Component,OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-adminreservatie',
  templateUrl: './admin-reservaties.component.html',
  styleUrls: ['./admin-reservaties.component.css']
})

export class AdminReservatiesComponent implements OnInit {
  zaal: Zaal;
  gebruiker: Gebruiker;
  myForm: FormGroup;
  ngForm: FormGroup;
  reservatie: Reservatie;
  id: string;



  constructor(private _location:Location,private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.reservatie = new Reservatie();
    //get if from url
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
//get right data from api and initialize forms
  ngOnInit() {
    this.reservatie = new Reservatie;
    this.zaal = new Zaal;
    this.gebruiker = new Gebruiker;
    this.gegevensOphalen();


    /*this.ngForm = new FormGroup({
      beginuur: new FormControl(this.ngForm.value.beginuur),
      einduur: new FormControl(this.ngForm.value.einduur),
      reden: new FormControl(this.ngForm.value.reden)
    });
    this.myForm = new FormGroup({
      reden: new FormControl(null)
    })*/
  }

  //update "reservatie" with data from "ngForm" and send patch to api
  //redirect to '/adminreservatieKalender'
  async onSubmit() {
    this.reservatie.bevestigd = true;
    /*this.reservatie.beginuur = this.ngForm.value.beginuur;
    this.reservatie.einduur = this.ngForm.value.einduur;
    this.reservatie.reden = this.ngForm.value.reden;*/
    this.reservatie.naam = "Bevestigd";

    console.log(this.reservatie);
    await this.reservatieService.acceptReservatie(this.reservatie);
    this.router.navigate(['/adminreservatieKalender/', this.reservatie.zaal[0]]);
  }

  //get reservation from url's ID
  //get "zaal" from the reservation
  //get user from reservation
  async gegevensOphalen() {
    this.reservatie = await this.reservatieService.getReservatie(this.id);

    //Gereserveerde zaal ophalen
    this.zaal = await this.zaalService.getZaal(this.reservatie.zaal[0]);

    //Gebruiker ophalen die de reservatie maakte
    this.gebruiker = await this.authService.getUser(this.reservatie.gebruiker);

  }

  //delete reservation, with reason for deletion from "myForm", reset froms and go to index
  async onWeiger() {
    await this.reservatieService.weigerReservatie(this.id, this.myForm.value.reden);
    this.myForm.reset();
    this.ngForm.reset();
    this.router.navigate(['/adminreservatieKalender/', this.reservatie.zaal[0]]);
  }
  backClick(){
    this._location.back();
  }
}
