import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-rider',
  templateUrl: './new-rider.component.html',
  styleUrls: ['./new-rider.component.css']
})
export class NewRiderComponent implements OnInit {

  riderForm: FormGroup;

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
    'country': [
      { type: 'required', message: 'Country is required.' },
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
    this.riderForm = this.fb.group({
      name: ['', Validators.required ],
      license: ['', Validators.required ],
      age: ['', Validators.required ],
      country: ['', Validators.required ],
      gender: ['', Validators.required ]
    });
  }

  resetFields() {
    this.riderForm = this.fb.group({
      name: new FormControl('', Validators.required),
      license: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createRider(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

}
