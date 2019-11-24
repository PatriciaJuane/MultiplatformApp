import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TrophyDto } from '../models/TrophyDto';
import { CompetitionService } from '../services/competition.service';
import { CompetitionDto } from '../models/CompetitionDto';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

//  @Output() trophySelected: EventEmitter<TrophyDto> = new EventEmitter();

  competition: CompetitionDto;
  displayedColumns: string[] = ['name', 'category', 'arena', 'initDate', 'endDate'];
  dataSource =  new MatTableDataSource<TrophyDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected actRoute: ActivatedRoute,
    private competitionService: CompetitionService,
    private router: Router
    ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
       /* this.competitionService.getCompetitionWithTrophys(id).subscribe((res: CompetitionDto) => {
          this.competition = res;
          this.dataSource.data = res.trophys;
        }); */
        this.competition = this.competitionService.getCompetitionWithTrophys(id);
        this.dataSource.data = this.competition.trophys;
      }
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(trophy: TrophyDto) {
    console.log(trophy);
 //   this.trophySelected.emit(trophy);
    this.router.navigate(['/trophy/' + trophy.id]);
  }

}
