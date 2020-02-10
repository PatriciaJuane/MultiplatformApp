import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent implements OnInit {

  clubForm: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'country': [
      { type: 'required', message: 'Country is required.' },
    ],
    'location': [
      { type: 'required', message: 'Location is required.' },
    ],
    'website': [
      { type: 'required', message: 'Website is required.' },
    ],
    'size': [
      { type: 'required', message: 'Size is required.' },
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
    this.clubForm = this.fb.group({
      name: ['', Validators.required ],
      country: ['', Validators.required ],
      location: ['', Validators.required ],
      website: ['', Validators.required ],
      size: ['', Validators.required ]
    });
  }

  resetFields() {
    this.clubForm = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createClub(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

}
