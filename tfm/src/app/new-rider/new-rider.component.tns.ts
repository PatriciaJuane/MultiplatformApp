import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { RiderDto } from '../models/RiderDto';

var imagepicker = require('nativescript-imagepicker');

@Component({
  selector: 'app-new-rider',
  templateUrl: './new-rider.component.html',
  styleUrls: ['./new-rider.component.css']
})
export class NewRiderComponent implements OnInit {

  rider = new RiderDto();
  name = '';
  country = '';
  license = '';
  age;
  gender = '';
  picture;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onSelectSingleTap() {
    console.log('Im in');
    let pic;
    function selectImages() {
      let context = imagepicker.create({
        mode: 'single'
      });
      context.authorize().then(function() {
        return context.present();
      }).then(function(selection) {
          console.log('Selection done: ' + JSON.stringify(selection));
          pic = selection.length > 0 ? selection[0] : null;
          console.log('Picture: ' + pic);
          this.picture = pic;
        }).catch(function (e) {
            console.log(e);
        });
    }
    selectImages();
  }

  onSubmit() {
    this.rider.name = this.name;
    this.rider.country = this.country;
    this.rider.license = this.license;
    this.rider.age = this.age;
    this.rider.gender = this.gender;
    console.log(this.rider);

    this.firebaseService.createRider(this.rider).then(res => {
        if (this.picture) {
          console.log('Picture that goes to firebase: ' + this.picture);
          this.firebaseService.upload(this.rider.name, this.picture);
        }
        this.router.navigate(['/home']);
      }
    );
  }

}
