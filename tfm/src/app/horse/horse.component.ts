import { Component, OnInit, ViewChild } from '@angular/core';
import { HorseDto } from '../models/HorseDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ResultExtendedDto } from '../models/ResultExtendedDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {

  horse: HorseDto;
  downloadURL: any;

  results: ResultExtendedDto[];
  displayedColumns: string[] = ['position', 'rider', 'points', 'time', 'competitionName'];
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

      this.firebaseService.getHorseByName(id).subscribe((res: HorseDto[]) => {
        this.horse = res[0];
        this.downloadURL = this.firebaseService.getDownloadUrl(this.horse.name);
        this.firebaseService.getResultsFromHorse(id).subscribe(data => {
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
