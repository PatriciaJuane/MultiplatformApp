import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubDto } from '../models/ClubDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ResultExtendedDto } from '../models/ResultExtendedDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  club: ClubDto;

  results: ResultExtendedDto[];
  displayedColumns: string[] = ['position', 'horse', 'rider', 'points', 'time', 'competitionName'];
  dataSource =  new MatTableDataSource<ResultExtendedDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this.firebaseService.getClubByName(id).subscribe((res: ClubDto[]) => {
        this.club = res[0];
        this.firebaseService.getResultsFromClub(id).subscribe(data => {
          this.dataSource.data = data;
          this.results = data;
        });
      });
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
