import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
  }

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

  horses() {
    this.router.navigate(['/horses']);
  }

  riders() {
    this.router.navigate(['/riders']);
  }

  clubs() {
    this.router.navigate(['/clubs']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  useLanguage(language: string) {
    this.translate.use(language);
}

  changeLanguage() {
    if (this.translate.currentLang === 'en') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }
  }

}
