import {Materiaal} from "./materiaal.model";

export class Zaal {
  id: number;
  naam: string;
  beschrijving: string;
  oppervlakte: number;
  foto: string;
  aanvang: string;
  sluiting: string;
  capaciteit: number;
  materiaal: Materiaal[];

  constructor(id: number, naam: string,
              beschrijving: string,
              oppervlakte: number,
              foto: string,
              aanvang: string,
              sluiting: string,
              capaciteit: number,
              materiaal: Materiaal[]) {
    this.id = id;
    this.naam = naam;
    this.beschrijving = beschrijving;
    this.oppervlakte = oppervlakte;
    this.foto = foto;
    this.aanvang = aanvang;
    this.sluiting = sluiting;
    this.capaciteit = capaciteit;
    this.materiaal = materiaal;
  }
}
