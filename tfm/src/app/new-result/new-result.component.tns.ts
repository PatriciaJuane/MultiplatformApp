import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { HorseDto } from '../models/HorseDto';
import { RiderDto } from '../models/RiderDto';
import { ClubDto } from '../models/ClubDto';
import { ResultDto } from '../models/ResultDto';
import { ListPicker } from 'tns-core-modules/ui/list-picker';
import { DropDown } from 'nativescript-drop-down';

@Component({
  selector: 'app-new-result',
  templateUrl: './new-result.component.html',
  styleUrls: ['./new-result.component.css']
})
export class NewResultComponent implements OnInit {

  trophyId: string;
  competitionId: string;
  horseNames: string[];
  riderNames: string[];
  clubNames: string[];

  result = new ResultDto();
  position;
  horse = '';
  rider = '';
  club = '';
  points;
  time = '';

  constructor(

    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.trophyId = id;
    });

    this.horseNames = [];
    this.firebaseService.getAllHorses().subscribe((res: HorseDto[]) => {
        let arr = [];
        res.forEach((obj: HorseDto) => {
            arr.push(obj.name);
        });
        this.horseNames = arr;
    });

    this.riderNames = [];
    this.firebaseService.getAllRiders().subscribe((res: RiderDto[]) => {
      let ar = [];
      res.forEach((obj: RiderDto) =>
          ar.push(obj.name)
      );
      this.riderNames = ar;
    });

    this.clubNames = [];
    this.firebaseService.getAllClubs().subscribe((res: ClubDto[]) => {
      let arra = [];
      res.forEach((obj: ClubDto) =>
          arra.push(obj.name)
      );
      this.clubNames = arra;
    });
  }

  public dropDownOpened() {
  }
  public dropDownClosed() {
  }

  public setHorse(args) {
    let dropdown = <DropDown>args.object;
    this.horse = this.horseNames[dropdown.selectedIndex];
    console.log('Horse updated: ' + this.horse);
  }

  public setRider(args) {
    let dropdown = <DropDown>args.object;
    // let picker = <ListPicker>args.object;
    this.rider = this.riderNames[dropdown.selectedIndex];
    console.log('Rider updated: ' + this.rider);
  }

  public setClub(args) {
    let dropdown = <DropDown>args.object;
    // let picker = <ListPicker>args.object;
    this.club = this.clubNames[dropdown.selectedIndex];
    console.log('Club updated: ' + this.club);
  }

  onSubmit() {
    this.result.position = this.position;
    this.result.horse = this.horse;
    this.result.rider = this.rider;
    this.result.club = this.club;
    this.result.points = this.points;
    this.result.time = this.time;
    console.log(this.result);

    this.firebaseService.currentCompetition.subscribe(data => this.competitionId = data);
    this.firebaseService.createResult(this.result, this.competitionId, this.trophyId)
      .then(res => {
        this.router.navigate(['/home']);
      });
  }

}
