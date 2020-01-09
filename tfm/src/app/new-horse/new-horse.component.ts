import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-new-horse',
  templateUrl: './new-horse.component.html',
  styleUrls: ['./new-horse.component.css']
})
export class NewHorseComponent implements OnInit {

  horseForm: FormGroup;
  fileName: string;
  public formData = new FormData();

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
    private router: Router,
    private firebaseStorage: AngularFireStorage
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
      gender: ['', Validators.required ],
      picture: [null, null ]
    });
  }

  resetFields() {
    this.horseForm = this.fb.group({
      name: new FormControl('', Validators.required),
      license: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      colour: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      picture: new FormControl(null, null)
    });
  }

  onSubmit(value) {
    this.firebaseService.createHorse(value)
    .then(
      res => {
        this.upload(value);
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

  change(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.fileName = event.target.files[i].name;
        this.formData.delete('picture');
        this.formData.append('picture', event.target.files[i], event.target.files[i].name);
      }
    }
  }

  upload(value) {
    let file = this.formData.get('picture');
    this.fileName = value.name;
    let ref = this.firebaseStorage.ref(this.fileName);
    let task = this.firebaseStorage.upload(this.fileName, file);
  }

}
