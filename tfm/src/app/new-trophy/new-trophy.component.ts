import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-trophy',
  templateUrl: './new-trophy.component.html',
  styleUrls: ['./new-trophy.component.css']
})
export class NewTrophyComponent implements OnInit {

  trophyForm: FormGroup;
  competitionId: string;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'category': [
     { type: 'required', message: 'Category is required.' }
   ],
   'initDate': [
     { type: 'required', message: 'InitDate is required.' },
   ]
 };

  constructor(
    protected actRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.actRoute.params.subscribe((params: Params) => {
      const id = params['id'] as string;
      this.competitionId = id;
    });
  }

  createForm() {
    this.trophyForm = this.fb.group({
      name: ['', Validators.required ],
      category: ['', Validators.required ],
      arena: [''],
      initDate: ['', Validators.required ]
    });
  }

  resetFields() {
    this.trophyForm = this.fb.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      arena: new FormControl(''),
      initDate: new FormControl('', Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createTrophy(value, this.competitionId)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/competition/' + this.competitionId]);
      }
    );
  }

}
