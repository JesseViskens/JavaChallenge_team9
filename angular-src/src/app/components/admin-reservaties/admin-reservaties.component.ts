import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-adminreservatie',
    templateUrl: './admin-reservaties.component.html',
    styleUrls:[ './admin-reservaties.component.css']
})

export class AdminReservatiesComponent implements OnInit {
    zaal: Zaal;
    gebruiker: Gebruiker;
    myForm: FormGroup;
    reservatie: Reservatie;

  constructor(private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router:Router) {
        this.reservatie = new Reservatie();
    }

    ngOnInit() {
      //reservatie ophalen
      this.reservatieService.getReservatie("5a19a1f66562b9380c74cc31").then(
        reservatie=>this.reservatie = reservatie
      );
      //Gereserveerde zaal ophalen
      this.zaalService.getZaal("5a1986f0f2f49126307a5220").then(
        zaal=>this.reservatie.zaal = zaal
      );
      //Gebruiker ophalen die de reservatie maakte
      this.authService.getUser("5a19e00475bd2524749c52b4").then(
        gebruiker=>this.reservatie.gebruiker = gebruiker
      );
        this.myForm = new FormGroup({})
    }

    onSubmit() {
      this.reservatie.bevestigd = true;
      this.reservatieService.acceptReservatie(this.reservatie);
      this.router.navigate(['/adminreservatieKalender']);
    }
}
