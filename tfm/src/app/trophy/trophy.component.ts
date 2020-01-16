import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ResultDto } from '../models/ResultDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TrophyDto } from '../models/TrophyDto';
import { MinutesSecondsPipe } from '../models/MinutesSecondsPipe';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.css']
})
export class TrophyComponent implements OnInit {

  competitionId: string;
  trophy: TrophyDto;
  trophyId: string;
  displayedColumns: string[] = ['position', 'horse', 'rider', 'club', 'points', 'time', 'action'];
  dataSource =  new MatTableDataSource<ResultDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.trophyId = id;

      this.firebaseService.currentCompetition.subscribe(data => this.competitionId = data);

      this.firebaseService.getTrophy(this.competitionId, id).subscribe(
          data => this.trophy = data
      );

      this.firebaseService.getResultsFromTrophy(this.competitionId, id).subscribe(
        data => this.dataSource.data = data
      );

    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.firebaseService.changeCurrentTrophy(this.trophyId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(result: ResultDto) {
    this.router.navigate(['/result/' + result.id]);
  }

  addResult() {
    this.router.navigate(['/newresult/' + this.trophyId]);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  delete(index: number, result) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.firebaseService.deleteResult(this.competitionId, this.trophyId, result.id);
  }

}
