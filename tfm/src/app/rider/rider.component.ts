import { Component, OnInit, ViewChild } from '@angular/core';
import { RiderDto } from '../models/RiderDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ResultExtendedDto } from '../models/ResultExtendedDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  rider: RiderDto;
  downloadURL: any;

  results: ResultExtendedDto[];
  displayedColumns: string[] = ['position', 'horse', 'points', 'time', 'competitionName'];
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

      this.firebaseService.getRiderByName(id).subscribe((res: RiderDto[]) => {
        this.rider = res[0];
        this.downloadURL = this.firebaseService.getDownloadUrl(this.rider.name);
        this.firebaseService.getResultsFromRider(id).subscribe(data => {
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
