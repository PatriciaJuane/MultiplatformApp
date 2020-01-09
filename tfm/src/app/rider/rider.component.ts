import { Component, OnInit } from '@angular/core';
import { RiderDto } from '../models/RiderDto';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  rider: RiderDto;
  downloadURL: any;

  constructor(
    protected actRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firebaseStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'];

      this.firebaseService.getRiderByName(id).subscribe((res: RiderDto[]) => {
        this.rider = res[0];
        this.downloadURL = this.firebaseStorage.ref(this.rider.name).getDownloadURL();
      });
    });
  }

}
