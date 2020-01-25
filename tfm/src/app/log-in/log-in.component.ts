import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() { }

  tryGoogleLogin() {
    this.authService.SigninWithGoogle()
    .then(res => {
      this.router.navigate(['/user']);
    });
  }

}
