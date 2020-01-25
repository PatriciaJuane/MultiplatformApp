import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { HorseDto } from '../models/HorseDto';
import { RiderDto } from '../models/RiderDto';
import { ClubDto } from '../models/ClubDto';

@Component({
  selector: 'app-new-result',
  templateUrl: './new-result.component.html',
  styleUrls: ['./new-result.component.css']
})
export class NewResultComponent implements OnInit {

  resultForm: FormGroup;
  trophyId: string;
  competitionId: string;
  horses: HorseDto[];
  riders: RiderDto[];
  clubNames: string[];

  validation_messages = {
   'position': [
     { type: 'required', message: 'Position is required.' }
   ],
   'horseName': [
     { type: 'required', message: 'Horse is required.' }
   ],
   'riderName': [
    { type: 'required', message: 'Rider is required.' }
  ],
   'points': [
     { type: 'required', message: 'Points are required.' },
   ],
   'time': [
    { type: 'required', message: 'Time is required.' }
  ]
 };

  constructor(
    protected actRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.trophyId = id;
    });

    this.horses = [];
    this.firebaseService.getAllHorses().subscribe((res: HorseDto[]) => {
        res.forEach((obj: HorseDto) => {
            this.horses.push(obj);
          });
    });

    this.riders = [];
    this.firebaseService.getAllRiders().subscribe((res: RiderDto[]) => {
      res.forEach((obj: RiderDto) =>
          this.riders.push(obj)
      );
    });

    this.clubNames = [];
    this.firebaseService.getAllClubs().subscribe((res: ClubDto[]) => {
      res.forEach((obj: ClubDto) =>
          this.clubNames.push(obj.name)
      );
    });
  }

  createForm() {
    this.resultForm = this.fb.group({
      position: ['', Validators.required ],
      horseName: ['', Validators.required ],
      riderName: ['', Validators.required ],
      clubName: [''],
      points: ['', Validators.required ],
      time: ['', Validators.required ]
    });
  }

  resetFields() {
    this.resultForm = this.fb.group({
      position: new FormControl('', Validators.required),
      horseName: new FormControl('', Validators.required),
      riderName: new FormControl('', Validators.required),
      clubName: new FormControl(''),
      points: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.currentCompetition.subscribe(data => this.competitionId = data);
    this.firebaseService.createResult(value, this.competitionId, this.trophyId)
      .then(res => {
        this.resetFields();
        this.router.navigate(['/trophy/' + this.trophyId]);
      });
  }

}
