import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
  }

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
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
    return this.authService.getIsLoggedIn();
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

  public openDrawer() {
    this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
    this.drawer.closeDrawer();
  }

  about() {
    this.router.navigate(['/about']);
  }

}
