export class Materiaal {
  id: number;
  naam: string;
  hoeveelheid: number;


  constructor(id: number, naam: string,
              hoeveelheid: number,
) {
    this.id = id;
    this.naam = naam;
    this.hoeveelheid = hoeveelheid;

  }
}
