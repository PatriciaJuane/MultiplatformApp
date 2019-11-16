import { Injectable } from '@angular/core';
import { CompetitionDto } from '../models/CompetitionDto';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  COMPETITIONS: CompetitionDto[] = [
    {
      id: 1,
      name: 'Trofeo Los Porches',
      location: 'A Coruña',
      country: 'ES',
      initDate: new Date(),
      endDate: new Date(),
      website: 'http://www.centrohipicolosporches.es/',
      type: 'Jumping',
      category: 'CSN***'
    },
    {
      id: 2,
      name: 'Trofeo Princesa de Asturias',
      location: 'Madrid',
      country: 'ES',
      initDate: new Date(),
      endDate: new Date(),
      website: 'http://www.centrohipicolosporches.es/',
      type: 'Jumping',
      category: 'CSN*****'
    },
    {
      id: 2,
      name: 'Internacional de Casas Novas',
      location: 'Arteixo',
      country: 'ES',
      initDate: new Date(),
      endDate: new Date(),
      website: 'http://www.csicasasnovas.es/',
      type: 'Jumping',
      category: 'CSI*****'
    }
  ];

  constructor() { }

  getAllCompetitions() {
    return this.COMPETITIONS;
  }
}
