import { Component, OnInit } from '@angular/core';
import { ClubDto } from '../models/ClubDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  club: ClubDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this.firebaseService.getClubByName(id).subscribe((res: ClubDto[]) => {
        this.club = res[0];
      });
    });
  }

}
