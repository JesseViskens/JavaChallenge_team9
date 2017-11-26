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
  templateUrl: './reservatie-zonderzaal.component.html',
  styleUrls: ['./reservatie-zonderzaal.component.css']
})

export class ReservatieZonderZaalComponent implements OnInit {
  zalen: Zaal[];
  zaal: Zaal;
  gebruiker: Gebruiker;
  reservatie: Reservatie;
  id:string;
  myForm: FormGroup;

  constructor(private route: ActivatedRoute,private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router: Router) {
    this.reservatie = new Reservatie();
    this.reservatie.naam = "Reservatie 1";
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    //Ingelogde gebruiker ophalen
    this.authService.getCurrentUser().then(gebruiker => {
        this.gebruiker = new Gebruiker(gebruiker);
      }
    );
    //Alle zalen ophalen
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen).then(function () {
      this.zalen = this.zalen.sort((a, b) => {
        if (a.naam < b.naam) return -1;
        else if (a.naam > b.naam) return 1;
        else return 0;
      })
    }.bind(this));
    this.myForm = new FormGroup({
      beginuur: new FormControl(null),
      einduur: new FormControl(null),
      reden: new FormControl(null),
      zaalid: new FormControl(null)
    })
  }

  async onSubmit() {
    this.reservatie.gebruiker = this.gebruiker.id;
    this.reservatie.zaal = [this.myForm.value.zaalid];
    this.reservatie.beginuur = this.myForm.value.beginuur;
    this.reservatie.einduur = this.myForm.value.einduur;
    this.reservatie.reden = this.myForm.value.reden;
    console.log(this.reservatie);
    await this.reservatieService.reserveer(this.reservatie);
    this.myForm.reset();
    this.router.navigate(['/']);
  }
}
