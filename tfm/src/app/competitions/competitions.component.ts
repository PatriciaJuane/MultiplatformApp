import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CompetitionDto } from '../models/CompetitionDto';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  competitions = new Array<CompetitionDto>();
  @Output() competitionSelected: EventEmitter<CompetitionDto> = new EventEmitter();

  displayedColumns: string[] = ['name', 'location', 'country', 'initDate', 'endDate', 'website', 'type', 'category', 'action'];
  dataSource =  new MatTableDataSource<CompetitionDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
    ) {
      this.firebaseService.getCompetitions().subscribe(data => {
        this.dataSource.data = data;
        this.competitions = data;
      });
    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(competition: CompetitionDto) {
    this.competitionSelected.emit(competition);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

   delete(index: number, competition) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.firebaseService.deleteCompetition(competition.id);
  }

}
