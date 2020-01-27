import { Component, OnInit, ViewChild } from '@angular/core';
import { HorseDto } from '../models/HorseDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.css']
})
export class HorsesComponent implements OnInit {

  horses = new Array<HorseDto>();

  displayedColumns: string[] = ['name', 'colour', 'age', 'breed', 'license', 'action'];
  dataSource =  new MatTableDataSource<HorseDto>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.firebaseService.getAllHorses().subscribe(data => {
      this.dataSource.data = data;
      this.horses = data;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(horse: HorseDto) {
    this.router.navigate(['/horse/' + horse.name]);
  }

  isLoggedIn() {
    return this.authService.getIsLoggedIn();
  }

  delete(index: number, horse) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.firebaseService.deleteHorse(horse.id);
  }

  deleteMobile(index: number, horse) {
    this.horses.splice(index, 1);
    this.firebaseService.deleteHorse(horse.id);
  }

}
