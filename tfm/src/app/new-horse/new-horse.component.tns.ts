import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { HorseDto } from '../models/HorseDto';

var imagepicker = require('nativescript-imagepicker');

@Component({
  selector: 'app-new-horse',
  templateUrl: './new-horse.component.html',
  styleUrls: ['./new-horse.component.css']
})
export class NewHorseComponent implements OnInit {

  horse = new HorseDto();
  name = '';
  colour = '';
  age;
  breed = '';
  license = '';
  picture;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

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
    this.horse.name = this.name;
    this.horse.colour = this.colour;
    this.horse.age = this.age;
    this.horse.breed = this.breed;
    this.horse.license = this.license;
    console.log(this.horse);

    this.firebaseService.createHorse(this.horse).then(res => {
        if (this.picture) {
          console.log('Picture that goes to firebase: ' + this.picture);
          this.firebaseService.upload(this.horse.name, this.picture);
        }
        this.router.navigate(['/home']);
      }
    );
  }


}
