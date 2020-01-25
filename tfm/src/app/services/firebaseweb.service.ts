import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HorseDto } from '../models/HorseDto';
import { RiderDto } from '../models/RiderDto';
@Injectable({
  providedIn: 'root'
})
export class FirebaseWebService extends FirebaseService {

  competitions: Observable<any[]>;
  trophies: Observable<any[]>;
  results: Observable<any[]>;
  horses: Observable<any[]>;
  riders: Observable<any[]>;
  clubs: Observable<any[]>;

  constructor(public db: AngularFirestore,
    public firebaseStorage: AngularFireStorage) {
    super();
  }

  createHorse(value) {
    return this.db.collection('horses').add({
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
    return this.db.collection('riders').add({
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
    return this.db.collection('clubs').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      country: value.country,
      location: value.location,
      website: value.website,
      size: value.size
    });
  }

  createCompetition(value) {
    return this.db.collection('competitions').add({
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
    return this.db.collection('competitions').doc(competitionId).collection('trophies').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      category: value.category,
      arena: value.arena,
      initDate: value.initDate,
      hour: value.hour
    });
  }

  createResult(value, competitionId: string, trophyId: string) {
    this.db.collection('horses').doc(value.horseName).collection('results').add({
        position: value.position,
          horse: value.horseName,
          rider: value.riderName,
          club: value.clubName,
          points: value.points,
          time: value.time
    });
    this.db.collection('riders').doc(value.riderName).collection('results').add({
        position: value.position,
          horse: value.horseName,
          rider: value.riderName,
          club: value.clubName,
          points: value.points,
          time: value.time
    });
    return this.db.collection('competitions').doc(competitionId)
      .collection('trophies').doc(trophyId).collection('results').add({
        position: value.position,
        horse: value.horseName,
        rider: value.riderName,
        club: value.clubName,
        points: value.points,
        time: value.time
    });
  }

  getCompetitions() {
    this.competitions = this.db.collection<any>('/competitions').snapshotChanges().pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
    ));
    return this.competitions;
  }

  getCompetition(compKey): Observable<any> {
    return this.db
      .collection('competitions')
      .doc(compKey)
      .valueChanges();
  }

  getTrophiesFromCompetition(compKey) {
    this.trophies = this.db.collection('competitions').doc(compKey)
    .collection<any>('trophies').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.trophies;
  }

  getTrophy(compKey, trophyKey): Observable<any> {
    return this.db.collection('competitions').doc(compKey)
    .collection('trophies').doc(trophyKey).valueChanges();
  }

  getResultsFromTrophy(compKey, trophyKey) {
    this.results = this.db.collection('competitions').doc(compKey)
    .collection('trophies').doc(trophyKey)
    .collection<any>('results').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.results;
  }

  getResult(competitionKey, trophyKey, resultKey): Observable<any> {
    return this.db.collection('competitions').doc(competitionKey)
    .collection('trophies').doc(trophyKey)
    .collection('results').doc(resultKey).valueChanges();
  }

  getAllHorses() {
    this.horses = this.db.collection<any>('/horses').snapshotChanges().pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
    ));
    return this.horses;
  }

  getAllRiders() {
    this.riders = this.db.collection<any>('/riders').snapshotChanges().pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
    ));
    return this.riders;
  }

  getAllClubs() {
    this.clubs = this.db.collection<any>('/clubs').snapshotChanges().pipe(
      map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
    ));
    return this.clubs;
  }

  getHorseByName(value: string) {
    return this.db.collection('horses', ref => ref.where('name', '==', value)).valueChanges();
  }

  getRiderByName(value: string) {
    return this.db.collection('riders', ref => ref.where('name', '==', value)).valueChanges();
  }

  getClubByName(value: string) {
    return this.db.collection('clubs', ref => ref.where('name', '==', value)).valueChanges();
  }

  deleteCompetition(competitionKey: string) {
    this.db.collection('competitions').doc(competitionKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  deleteTrophy(competitionKey, trophyKey) {
    this.db.collection('competitions').doc(competitionKey).
    collection('trophies').doc(trophyKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  deleteResult(competitionKey, trophyKey, resultKey) {
    this.db.collection('competitions').doc(competitionKey).
    collection('trophies').doc(trophyKey).collection('results').doc(resultKey).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  getDownloadUrl(value) {
    return this.firebaseStorage.ref(value).getDownloadURL();
  }

  getResultsFromRider(value: string) {
    this.results = this.db.collection('riders').doc(value)
    .collection<any>('results').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.results;
  }

  getResultsFromHorse(value: string) {
    this.results = this.db.collection('horses').doc(value)
    .collection<any>('results').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.results;
  }

  public upload(fileName, file): any {
    const ref = this.firebaseStorage.ref(fileName);
    const task = this.firebaseStorage.upload(fileName, file);
    return task;
  }

}
