import { Component, OnInit } from '@angular/core';
import { HorseDto } from '../models/HorseDto';
import { ActivatedRoute, Params } from '@angular/router';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {

  horse: HorseDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private resultsService: ResultsService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.horse = this.resultsService.getHorse(id);
      }
    });
  }

}
