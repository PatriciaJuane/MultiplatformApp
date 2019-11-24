import { Component, OnInit } from '@angular/core';
import { RiderDto } from '../models/RiderDto';
import { ActivatedRoute, Params } from '@angular/router';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  rider: RiderDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private resultsService: ResultsService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.rider = this.resultsService.getRider(id);
      }
    });
  }

}
