import { Component, OnInit } from '@angular/core';
import { HorseDto } from '../models/HorseDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {

  horse: HorseDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'];

      this.firebaseService.getHorseByName(id).subscribe((res: HorseDto[]) => {
        this.horse = res[0];
      });
    });
  }

}
