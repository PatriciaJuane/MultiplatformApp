import { Component, OnInit, ViewChild } from '@angular/core';
import { ClubDto } from '../models/ClubDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs = new Array<ClubDto>();

  displayedColumns: string[] = ['name', 'country', 'location', 'website', 'size', 'action'];
  dataSource =  new MatTableDataSource<ClubDto>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.firebaseService.getAllClubs().subscribe(data => {
      this.dataSource.data = data;
      this.clubs = data;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(club: ClubDto) {
    this.router.navigate(['/club/' + club.name]);
  }

  isLoggedIn() {
    return this.authService.getIsLoggedIn();
  }

  delete(index: number, club) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.firebaseService.deleteClub(club.id);
  }

  deleteMobile(index: number, club) {
    this.clubs.splice(index, 1);
    this.firebaseService.deleteClub(club.id);
  }


}
