import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Main Arena';

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  returnHome() {
    this.router.navigate(['/home']);
  }

  addHorse() {
    this.router.navigate(['/newhorse']);
  }

  addRider() {
    this.router.navigate(['/newrider']);
  }

  addClub() {
    this.router.navigate(['/newclub']);
  }

  addCompetition() {
    this.router.navigate(['/newcompetition']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/user']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
