import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TrophyDto } from '../models/TrophyDto';

@Component({
  selector: 'app-new-trophy',
  templateUrl: './new-trophy.component.html',
  styleUrls: ['./new-trophy.component.css']
})
export class NewTrophyComponent implements OnInit {

  competitionId: string;
  trophy = new TrophyDto();
  name = '';
  category = '';
  arena = '';
  initDate;
  hour = '';

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.competitionId = id;
    });
  }

  onSubmit() {
    this.trophy.name = this.name;
    this.trophy.category = this.category;
    this.trophy.arena = this.arena;
    this.trophy.initDate = this.initDate;
    this.trophy.hour = this.hour;
    console.log(this.trophy);

    this.firebaseService.createTrophy(this.trophy, this.competitionId)
    .then(
      res => {
        this.router.navigate(['/competition/' + this.competitionId]);
      }
    );
  }

}
