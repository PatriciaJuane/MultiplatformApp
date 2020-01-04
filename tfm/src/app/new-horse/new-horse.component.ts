import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-new-horse',
  templateUrl: './new-horse.component.html',
  styleUrls: ['./new-horse.component.css']
})
export class NewHorseComponent implements OnInit {

  horseForm: FormGroup;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'license': [
     { type: 'required', message: 'License is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ],
   'breed': [
     { type: 'required', message: 'Breed is required.' },
   ],
   'colour': [
     { type: 'required', message: 'Colour is required.' },
   ],
   'gender': [
     { type: 'required', message: 'Gender is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.horseForm = this.fb.group({
      name: ['', Validators.required ],
      license: ['', Validators.required ],
      age: ['', Validators.required ],
      breed: ['', Validators.required ],
      colour: ['', Validators.required ],
      gender: ['', Validators.required ]
    });
  }

  resetFields() {
    this.horseForm = this.fb.group({
      name: new FormControl('', Validators.required),
      license: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      colour: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createHorse(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

}
