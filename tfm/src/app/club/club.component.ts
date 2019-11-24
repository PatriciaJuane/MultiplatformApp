import { Component, OnInit } from '@angular/core';
import { ClubDto } from '../models/ClubDto';
import { ActivatedRoute, Params } from '@angular/router';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  club: ClubDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private resultsService: ResultsService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.club = this.resultsService.getClub(id);
      }
    });
  }

}
