import { Component, OnInit } from '@angular/core';
import { RiderDto } from '../models/RiderDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  rider: RiderDto;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'];

      this.firebaseService.getRiderByName(id).subscribe((res: RiderDto[]) => {
        this.rider = res[0];
      });
    });
  }

}
