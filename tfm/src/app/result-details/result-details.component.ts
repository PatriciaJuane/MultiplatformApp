import { Component, OnInit } from '@angular/core';
import { ResultDto } from '../models/ResultDto';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ResultsService } from '../services/results.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {

  result: ResultDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private resultsService: ResultsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
       /* this.competitionService.getCompetitionWithTrophys(id).subscribe((res: CompetitionDto) => {
          this.competition = res;
          this.dataSource.data = res.trophys;
        }); */
        this.result = this.resultsService.getResult(id);
      }
    });
  }

  onHorseSelected() {
    this.router.navigate(['/horse/' + this.result.horse.id]);
  }

  onRiderSelected() {
    this.router.navigate(['/rider/' + this.result.rider.id]);
  }

  onClubSelected() {
    this.router.navigate(['/club/' + this.result.club.id]);
  }

}
