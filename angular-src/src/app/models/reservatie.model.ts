import {Zaal} from "./zaal.model";

export class Reservatie{
    naam: string;
    beginuur: string;
    einduur: string;
    zaal: Zaal;
    gebruiker: string;
    bevestigd: boolean;
    reden: string;

    constructor(naam: string, beginuur: string, einduur: string, zaal: Zaal, gebruiker: string, reden: string) {
        this.naam = naam;
        this.beginuur = beginuur;
        this.einduur = einduur;
        this.zaal = zaal;
        this.gebruiker = gebruiker;
        this.bevestigd = false;
        this.reden = reden;
    }
}
