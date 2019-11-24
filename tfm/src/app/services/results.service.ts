import { Injectable } from '@angular/core';
import { ResultDto } from '../models/ResultDto';
import { TrophyDto } from '../models/TrophyDto';
import { HorseDto } from '../models/HorseDto';
import { RiderDto } from '../models/RiderDto';
import { ClubDto } from '../models/ClubDto';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  HORSE: HorseDto = {
    id: 1,
    name: 'Horse 1',
    colour: 'Bay',
    age: 11,
    breed: 'Holsteiner',
    license: '3637367'
  };

  RIDER: RiderDto = {
    id: 1,
    name: 'Patricia Juane',
    country: 'Spain',
    age: 23,
    license: '32776'
  };

  CLUB: ClubDto = {
    id: 1,
    name: 'Hipica 1',
    country: 'Spain',
    location: 'A Coruña',
    website: 'www.hipica.es',
    size: 'Medium'
  };

  RESULTS: ResultDto[] = [
    {
      id: 1,
      position: 1,
      horse: this.HORSE,
      rider: this.RIDER,
      club: this.CLUB,
      points: 0,
      time: '1:26'
    },
    {
      id: 2,
      position: 2,
      horse: this.HORSE,
      rider: this.RIDER,
      club: this.CLUB,
      points: 4,
      time: '1:24'
    },
    {
      id: 3,
      position: 3,
      horse: this.HORSE,
      rider: this.RIDER,
      club: this.CLUB,
      points: 8,
      time: '1:30'
    }
  ];

  TROPHY: TrophyDto = {
    id: 1,
    name: 'Grand Prix',
    category: '1.35',
    arena: 'Main Arena',
    initDate: new Date(),
    endDate: new Date(),
    results: this.RESULTS
  };

  constructor() { }

  public getTrophy(id: number) {
    console.log(id);
    return this.TROPHY;
  }

  public getResult(id: number) {
    return this.RESULTS[1];
  }

  public getHorse(id: number) {
    return this.HORSE;
  }

  public getRider(id: number) {
    return this.RIDER;
  }

  public getClub(id: number) {
    return this.CLUB;
  }

}
