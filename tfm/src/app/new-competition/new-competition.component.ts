import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.css']
})
export class NewCompetitionComponent implements OnInit {

  competitionForm: FormGroup;

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
    'initDate': [
      { type: 'required', message: 'InitDate is required.' },
    ],
    'endDate': [
      { type: 'required', message: 'EndDate is required.' },
    ],
    'website': [
      { type: 'required', message: 'Website is required.' },
    ],
    'type': [
      { type: 'required', message: 'Type is required.' },
    ],
    'category': [
      { type: 'required', message: 'Category is required.' },
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
    console.log(this.competitionForm);
  }

  createForm() {
    this.competitionForm = this.fb.group({
      name: ['', Validators.required ],
      country: ['', Validators.required ],
      location: ['', Validators.required ],
      initDate: ['', Validators.required ],
      endDate: ['', Validators.required ],
      website: ['', Validators.required ],
      type: ['', Validators.required ],
      category: ['', Validators.required ]
    });
  }

  resetFields() {
    this.competitionForm = this.fb.group({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      initDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createCompetition(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    );
  }

}
