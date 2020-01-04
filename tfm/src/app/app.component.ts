import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Main Arena';

  constructor(
    private router: Router
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

}
