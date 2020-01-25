import { Injectable, NgZone } from '@angular/core';
const firebaseApp = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { firestore } from 'nativescript-plugin-firebase';
import { CompetitionDto } from '../models/CompetitionDto';
import { TrophyDto } from '../models/TrophyDto';
import { ResultDto } from '../models/ResultDto';
@Injectable()
export class FirebaseMobileService extends FirebaseService {

  competitions: Observable<any[]>;
  trophies: Observable<any[]>;
  results: Observable<any[]>;
  horses: Observable<any[]>;
  riders: Observable<any[]>;
  clubs: Observable<any[]>;

  competition: CompetitionDto;
  trophy: TrophyDto;
  result: ResultDto;

  constructor(private zone: NgZone) {
    super();
    firebase.init({}).then((instance) => {
      console.log('[*] Firebase was successfully initialised');
    }, (error) => {
      console.log('[*] Huston we have an initialization error: ' + error);
    });
  }

  createHorse(value) {
    const horseCollection = firebaseApp.firestore().collection('horses');
    return horseCollection.add({
      name: value.name,
      license: value.license,
      nameToSearch: value.name.toLowerCase(),
      breed: value.breed,
      colour: value.colour,
      // tslint:disable-next-line: radix
      age: parseInt(value.age),
      gender: value.gender
    });
  }

  createRider(value) {
    const ridersCollection = firebaseApp.firestore().collection('riders');
    return ridersCollection.add({
      name: value.name,
      license: value.license,
      nameToSearch: value.name.toLowerCase(),
      country: value.country,
      // tslint:disable-next-line: radix
      age: parseInt(value.age),
      gender: value.gender
    });
  }

  createClub(value) {
    const clubsCollection = firebaseApp.firestore().collection('clubs');
    return clubsCollection.add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      country: value.country,
      location: value.location,
      website: value.website,
      size: value.size
    });
  }

  createCompetition(value) {
    const competitionsCollection = firebaseApp.firestore().collection('competitions');
    return competitionsCollection.add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      country: value.country,
      location: value.location,
      initDate: value.initDate,
      endDate: value.endDate,
      website: value.website,
      type: value.type,
      category: value.category
    });
  }

  createTrophy(value, competitionId: string) {
    const trophiesCollection = firebaseApp.firestore().collection('competitions').doc(competitionId).collection('trophies');
    return trophiesCollection.add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      category: value.category,
      arena: value.arena,
      initDate: value.initDate,
      hour: value.hour
    });
  }

  createResult(value: ResultDto, competitionId: string, trophyId: string) {
    const horseDoc = firebaseApp.firestore().collection('horses').doc(value.horse);
    horseDoc.collection('results').add({
      position: value.position,
        horse: value.horse,
        rider: value.rider,
        club: value.club,
        points: value.points,
        time: value.time
    });

    const riderDoc = firebaseApp.firestore().collection('riders').doc(value.rider);
    riderDoc.collection('results').add({
      position: value.position,
        horse: value.horse,
        rider: value.rider,
        club: value.club,
        points: value.points,
        time: value.time
    });

    const clubDoc = firebaseApp.firestore().collection('clubs').doc(value.club);
    clubDoc.collection('results').add({
      position: value.position,
        horse: value.horse,
        rider: value.rider,
        club: value.club,
        points: value.points,
        time: value.time
    });

    const resultsCollection = firebaseApp.firestore().collection('competitions').doc(competitionId)
    .collection('trophies').doc(trophyId).collection('results');
    return resultsCollection.add({
      position: value.position,
      horse: value.horse,
      rider: value.rider,
      club: value.club,
      points: value.points,
      time: value.time
    });
  }

  getCompetitions(): Observable<any[]> {
    const competitionsCollection = firebaseApp.firestore().collection('competitions');
    return new Observable(observer => {
        const unsubscribe = competitionsCollection.onSnapshot((snapshot: any) => {
          let results = [];
          snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

          this.zone.run(() => {
              if (results !== undefined) {
                  observer.next(results);
              } else {
                  observer.next(undefined);
              }
          });
        });
        return () => unsubscribe();
    });
  }

  getCompetition(compKey): Observable<any> {
    const competitionDoc = firebaseApp.firestore().collection('competitions').doc(compKey);
    return new Observable(observer => {
      const unsubscribe = competitionDoc.onSnapshot(doc => {
          this.zone.run(() => {
            this.competition = <CompetitionDto>doc.data();
            observer.next(this.competition);
          });
      });
      return () => unsubscribe();
    });
  }

  getTrophiesFromCompetition(compKey) {
    const trophiesCollection = firebaseApp.firestore().collection('competitions').
      doc(compKey).collection('trophies');

    return new Observable(observer => {
      const unsubscribe = trophiesCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getTrophy(compKey, trophyKey): Observable<any> {
    const trophyDoc = firebaseApp.firestore().collection('competitions').
      doc(compKey).collection('trophies').doc(trophyKey);
    return new Observable(observer => {
      const unsubscribe = trophyDoc.onSnapshot(doc => {
          this.zone.run(() => {
            this.trophy = <TrophyDto>doc.data();
            observer.next(this.trophy);
          });
      });
      return () => unsubscribe();
    });
  }

  getResultsFromTrophy(compKey, trophyKey) {
    const resultsCollection = firebaseApp.firestore().collection('competitions').doc(compKey)
    .collection('trophies').doc(trophyKey).collection('results');

    return new Observable(observer => {
      const unsubscribe = resultsCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));
        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getResult(competitionKey, trophyKey, resultKey): Observable<any> {
    const resultDoc = firebaseApp.firestore().collection('competitions').doc(competitionKey)
      .collection('trophies').doc(trophyKey).collection('results').doc(resultKey);
    return new Observable(observer => {
        const unsubscribe = resultDoc.onSnapshot(doc => {
            this.zone.run(() => {
              this.result = <ResultDto>doc.data();
              observer.next(this.result);
            });
        });
        return () => unsubscribe();
      });
  }

  getAllHorses() {
     const horseCollection = firebaseApp.firestore().collection('horses');

     return new Observable(observer => {
      const unsubscribe = horseCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getAllRiders() {
    const ridersCollection = firebaseApp.firestore().collection('riders');

    return new Observable(observer => {
      const unsubscribe = ridersCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getAllClubs() {
    const clubsCollection = firebaseApp.firestore().collection('clubs');

    return new Observable(observer => {
      const unsubscribe = clubsCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getHorseByName(value: string) {
    const query = firebaseApp.firestore().collection('horses').where('name', '==', value);
    return new Observable(observer => {
      const unsubscribe = query.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));
        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getRiderByName(value: string) {
    const query = firebaseApp.firestore().collection('riders').where('name', '==', value);
    return new Observable(observer => {
      const unsubscribe = query.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));
        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getClubByName(value: string) {
    const query = firebaseApp.firestore().collection('clubs').where('name', '==', value);
    return new Observable(observer => {
      const unsubscribe = query.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));
        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  deleteCompetition(competitionKey: string) {
    const competitionsCollection = firebaseApp.firestore().collection('competitions');
    competitionsCollection.doc(competitionKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  deleteTrophy(competitionKey, trophyKey) {
    const trophiesCollection = firebaseApp.firestore().collection('competitions').doc(competitionKey).collection('trophies');

    trophiesCollection.doc(trophyKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  deleteResult(competitionKey, trophyKey, resultKey) {
    const resultsCollection = firebaseApp.firestore().collection('competitions').doc(competitionKey)
    .collection('trophies').doc(trophyKey).collection('results');

    resultsCollection.doc(resultKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  getDownloadUrl(value) {
    return firebase.storage.getDownloadUrl({
      // the full path of an existing file in Firebase storage
      remoteFullPath: value
    });
    /*).then(
        function (url) {
          console.log('Remote URL: ' + url);
        },
        function (error) {
          console.log('Error: ' + error);
        }
    );*/
  }

  getResultsFromRider(value): any {
    const resultsCollection = firebaseApp.firestore().collection('riders').
      doc(value).collection('results');

    return new Observable(observer => {
      const unsubscribe = resultsCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  getResultsFromHorse(value): any {
    const resultsCollection = firebaseApp.firestore().collection('horses').
    doc(value).collection('results');

    return new Observable(observer => {
      const unsubscribe = resultsCollection.onSnapshot((snapshot: any) => {
        let results = [];
        snapshot.forEach(doc => results.push({id: doc.id, ...doc.data()}));

        this.zone.run(() => {
            if (results !== undefined) {
                observer.next(results);
            } else {
                observer.next(undefined);
            }
        });
      });
      return () => unsubscribe();
    });
  }

  public upload(fileName, file): any {
    const ref = firebase.storage.ref(fileName);
    const task = firebase.storage.upload(fileName, file);
    return task;
  }

}
