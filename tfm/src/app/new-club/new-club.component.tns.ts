import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { ClubDto } from '../models/ClubDto';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent implements OnInit {

  club = new ClubDto();
  name: '';
  country: '';
  location: '';
  website: '';
  size: '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.club.name = this.name;
    this.club.country = this.country;
    this.club.location = this.location;
    this.club.website = this.website;
    this.club.size = this.size;
    console.log(this.club);

    this.firebaseService.createClub(this.club)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    );
  }

}
