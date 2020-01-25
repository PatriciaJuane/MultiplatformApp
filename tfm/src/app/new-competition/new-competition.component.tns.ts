import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { CompetitionDto } from '../models/CompetitionDto';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.css']
})
export class NewCompetitionComponent implements OnInit {
  competition = new CompetitionDto();

  name = '';
  country = '';
  location = '';
  initDate;
  endDate;
  website = '';
  type = '';
  category = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.competition.name = this.name;
    this.competition.country = this.country;
    this.competition.location = this.location;
    this.competition.initDate = this.initDate;
    this.competition.endDate = this.endDate;
    this.competition.website = this.website;
    this.competition.type = this.type;
    this.competition.category = this.category;

    console.log(this.competition);
    this.firebaseService.createCompetition(this.competition)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    );
  }

}
