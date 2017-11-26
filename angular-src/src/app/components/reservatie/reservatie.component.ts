import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reservatie',
  templateUrl: './reservatie.component.html',
  styleUrls: ['./reservatie.component.css']
})

export class ReservatieComponent implements OnInit {
  zalen: Zaal[];
  zaal: Zaal;
  gebruiker: Gebruiker;
  reservatie: Reservatie;
  id:string;
  myForm: FormGroup;

  constructor(private route: ActivatedRoute,private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router: Router) {
    //initialize "gebruiker" with dummy name
    this.reservatie = new Reservatie();
    this.reservatie.naam = "Nieuwe reservatie";
    //get id from url
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    //get chozen "zaal"
    this.zaalService.getZaal(this.id).then(zaal => {
        this.zaal = new Zaal(zaal);
      }
    );
    //get logged in user
    this.authService.getCurrentUser().then(gebruiker => {
        this.gebruiker = new Gebruiker(gebruiker);
      }
    );
    //initialize form
    this.myForm = new FormGroup({
      beginuur: new FormControl(null),
      einduur: new FormControl(null),
      reden: new FormControl(null)
    })
  }

  //when onSubmit is pressed get everything from the form in a "reservatie" object
  //then send objest to api and reset form, finally redirect to index page
  async onSubmit() {
    this.reservatie.bevestigd = false;
    this.reservatie.gebruiker = this.gebruiker.id;
    this.reservatie.zaal = [this.id];
    this.reservatie.beginuur = this.myForm.value.beginuur;
    this.reservatie.einduur = this.myForm.value.einduur;
    this.reservatie.reden = this.myForm.value.reden;
    console.log(this.reservatie);
    await this.reservatieService.reserveer(this.reservatie);
    this.myForm.reset();
    this.router.navigate(['/']);
  }
}
