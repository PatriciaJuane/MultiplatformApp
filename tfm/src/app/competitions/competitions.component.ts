import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CompetitionDto } from '../models/CompetitionDto';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CompetitionsService } from '../services/competitions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  @Output() competitionSelected: EventEmitter<CompetitionDto> = new EventEmitter();

  displayedColumns: string[] = ['name', 'location', 'country', 'initDate', 'endDate', 'type', 'category'];
  dataSource =  new MatTableDataSource<CompetitionDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private competitionsService: CompetitionsService) {
    this.dataSource.data = this.competitionsService.getAllCompetitions();
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

}
