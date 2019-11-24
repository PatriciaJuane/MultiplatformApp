import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ResultDto } from '../models/ResultDto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResultsService } from '../services/results.service';
import { TrophyDto } from '../models/TrophyDto';
import { MinutesSecondsPipe } from '../models/MinutesSecondsPipe';

@Component({
  selector: 'app-trophy',
  templateUrl: './trophy.component.html',
  styleUrls: ['./trophy.component.css']
})
export class TrophyComponent implements OnInit {

 // @Output() resultSelected: EventEmitter<ResultDto> = new EventEmitter();
  trophy: TrophyDto;
  displayedColumns: string[] = ['position', 'horse', 'rider', 'club', 'points', 'time'];
  dataSource =  new MatTableDataSource<ResultDto>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    protected actRoute: ActivatedRoute,
    private resultsService: ResultsService,
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
        this.trophy = this.resultsService.getTrophy(id);
        this.dataSource.data = this.trophy.results;
      }
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemSelected(result: ResultDto) {
    // this.resultSelected.emit(result);
    this.router.navigate(['/result/' + result.id]);
  }

}
