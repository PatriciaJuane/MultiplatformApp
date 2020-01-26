import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(result => {
      this.user = result;
      console.log(this.user);
    });
  }

  logout() {
    this.authService.SignOut().then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('Logout error', error);
    });
  }

}
