import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TrophyDto } from '../models/TrophyDto';
import { CompetitionDto } from '../models/CompetitionDto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition: CompetitionDto;
  trophies: TrophyDto[];

  id: string;
  displayedColumns: string[] = ['name', 'category', 'arena', 'initDate', 'hour', 'action'];
  dataSource =  new MatTableDataSource<TrophyDto>();
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
      this.id = id;

      this.firebaseService.getCompetition(id).subscribe((res: CompetitionDto) => {
        this.competition = res;
      });

      this.firebaseService.getTrophiesFromCompetition(id).subscribe(data => {
        this.dataSource.data = data;
        this.trophies = data;
      });
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.firebaseService.changeCurrentCompetition(this.id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(trophy: TrophyDto) {
    trophy.competitionId = this.id;
    this.router.navigate(['/trophy/' + trophy.id]);
  }

  addTrophy() {
    this.router.navigate(['/newtrophy/' + this.id]);
  }

  isLoggedIn() {
    return this.authService.getIsLoggedIn();
  }

  delete(index: number, trophy) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.firebaseService.deleteTrophy(this.id, trophy.id);
  }

  deleteMobile(index: number, trophy) {
    this.trophies.splice(index, 1);
    this.firebaseService.deleteTrophy(this.id, trophy.id);
  }

}
