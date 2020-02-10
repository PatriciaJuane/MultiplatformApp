import { Component, OnInit, ViewChild } from '@angular/core';
import { RiderDto } from '../models/RiderDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {

  riders = new Array<RiderDto>();

  displayedColumns: string[] = ['name', 'country', 'age', 'license', 'gender', 'action'];
  dataSource =  new MatTableDataSource<RiderDto>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.firebaseService.getAllRiders().subscribe(data => {
      this.dataSource.data = data;
      this.riders = data;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(rider: RiderDto) {
    this.router.navigate(['/rider/' + rider.name]);
  }

  isLoggedIn() {
    return this.authService.getIsLoggedIn();
  }

  delete(index: number, rider) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.firebaseService.deleteRider(rider.id);
  }

  deleteMobile(index: number, rider) {
    this.riders.splice(index, 1);
    this.firebaseService.deleteRider(rider.id);
  }

}
