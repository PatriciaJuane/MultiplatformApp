import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable()
export abstract class FirebaseService {

  /* Needed to navigate through collections. Competitions -> Trophies*/
  private competitionId = new BehaviorSubject('default-competition');
  currentCompetition = this.competitionId.asObservable();

  /* Needed to navigate through collections. Trophies -> Results*/
  private trophyId = new BehaviorSubject('default-trophy');
  currentTrophy = this.trophyId.asObservable();

  constructor() {}

  changeCurrentCompetition(competitionId: string) {
    this.competitionId.next(competitionId);
  }

  changeCurrentTrophy(trophyId: string) {
    this.trophyId.next(trophyId);
  }

  public createHorse(value): any {
  }

  public createRider(value): any {
  }

  public createClub(value): any {
  }

  public createCompetition(value): any {
  }

  public createTrophy(value, competitionId: string): any {
  }

  public createResult(value, competitionId: string, trophyId: string): any {
  }

  public getCompetitions(): Observable<any[]> {
      return of();
  }

  public getCompetition(compKey): Observable<any> {
      return of();
  }

  public getTrophiesFromCompetition(compKey): any {
  }

  public getTrophy(compKey, trophyKey): Observable<any> {
    return of();
  }

  public getResultsFromTrophy(compKey, trophyKey): any {
  }

  public getResult(competitionKey, trophyKey, resultKey): Observable<any> {
      return of();
  }

  public getAllHorses(): any {
  }

  public getAllRiders(): any {
  }

  public getAllClubs(): any {
  }

  public getHorseByName(value: string): any {
  }

  public getRiderByName(value: string): any {
  }

  public getClubByName(value: string): any {
  }

  public deleteCompetition(competitionKey: string): any {
  }

  public deleteTrophy(competitionKey, trophyKey): any {
  }

  public deleteResult(competitionKey, trophyKey, resultKey): any {
  }

  public getDownloadUrl(value): any {
  }

  public getResultsFromRider(value): any {
  }

  public getResultsFromHorse(value): any {
  }

  public upload(fileName, file): any {
  }

}
