import { Component, OnInit } from '@angular/core';
import { ResultDto } from '../models/ResultDto';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {

  result: ResultDto;
  resultId: string;

  competitionId: string;
  trophyId: string;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.resultId = id;

      this.firebaseService.currentCompetition.subscribe(data => this.competitionId = data);
      this.firebaseService.currentTrophy.subscribe(data => this.trophyId = data);

      this.firebaseService.getResult(this.competitionId, this.trophyId, id)
        .subscribe((res: ResultDto) => {
          this.result = res;
      });
    });
  }

  onHorseSelected() {
    this.router.navigate(['/horse/' + this.result.horse]);
  }

  onRiderSelected() {
    this.router.navigate(['/rider/' + this.result.rider]);
  }

  onClubSelected() {
    this.router.navigate(['/club/' + this.result.club]);
  }

}
