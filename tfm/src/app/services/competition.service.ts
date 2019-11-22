import { Injectable } from '@angular/core';
import { TrophyDto } from '../models/TrophyDto';
import { CompetitionDto } from '../models/CompetitionDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  TROPHYS: TrophyDto[] = [
    {
      id: 1,
      name: 'Trofeo Prosegur',
      category: '1.20',
      arena: 'Main Arena',
      initDate: new Date(),
      endDate: new Date()
    },
    {
      id: 2,
      name: 'Trofeo Eroski',
      category: '1.30',
      arena: 'Main Arena',
      initDate: new Date(),
      endDate: new Date()
    },
    {
      id: 3,
      name: 'Trofeo Xunta de Galicia',
      category: '1.40',
      arena: 'Main Arena',
      initDate: new Date(),
      endDate: new Date()
    }
  ];

  COMPETITION: CompetitionDto = {
    id: 2,
    name: 'Trofeo Princesa de Asturias',
    location: 'Madrid',
    country: 'ES',
    initDate: new Date(),
    endDate: new Date(),
    website: 'http://www.centrohipicolosporches.es/',
    type: 'Jumping',
    category: 'CSN*****',
    trophys: this.TROPHYS
  };

  constructor() { }

  getAllTrophys() {
    return this.TROPHYS;
  }

  public getCompetitionWithTrophys(id: number) {
    console.log(id);
    return this.COMPETITION;
  }
    // : Observable<CompetitionDto>
    // return this.requestRduService.requestRduWorkflow<any>('GET', `/natural-person/${id}/ccd-in-creation`);

}
