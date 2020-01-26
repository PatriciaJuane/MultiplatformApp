import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { CompetitionsComponent } from '@src/app/competitions/competitions.component';
import { CompetitionComponent } from '@src/app/competition/competition.component';
import { TrophyComponent } from '@src/app/trophy/trophy.component';
import { ResultDetailsComponent } from '@src/app/result-details/result-details.component';
import { PageNotFoundComponent } from '@src/app/page-not-found/page-not-found.component';
import { HorseComponent } from '@src/app/horse/horse.component';
import { RiderComponent } from '@src/app/rider/rider.component';
import { ClubComponent } from '@src/app/club/club.component';
import { LogInComponent } from '@src/app/log-in/log-in.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MinutesSecondsPipe } from './models/MinutesSecondsPipe';
import { AppRoutingModule } from './app-routing.module.tns';
import { FirebaseService } from './services/firebase.service';
import { FirebaseMobileService } from './services/firebasemobile.service';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NewCompetitionComponent } from './new-competition/new-competition.component.tns';
import { NewTrophyComponent } from './new-trophy/new-trophy.component.tns';
import { NewResultComponent } from './new-result/new-result.component.tns';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { NewClubComponent } from './new-club/new-club.component.tns';
import { NewRiderComponent } from './new-rider/new-rider.component.tns';
import { NewHorseComponent } from './new-horse/new-horse.component.tns';
import { AuthMobileService } from './services/authenticationmobile.service';
import { AuthService } from './services/authentication.service';
import { UserComponent } from './user/user.component.tns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompetitionsComponent,
    CompetitionComponent,
    TrophyComponent,
    MinutesSecondsPipe,
    ResultDetailsComponent,
    PageNotFoundComponent,
    HorseComponent,
    RiderComponent,
    ClubComponent,
    NewHorseComponent,
    NewRiderComponent,
    NewClubComponent,
    NewTrophyComponent,
    NewResultComponent,
    LogInComponent,
    UserComponent,
    NewCompetitionComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NativeScriptFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NativeScriptHttpClientModule,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    DropDownModule
  ],
  providers: [
    {
      provide: FirebaseService,
      useClass: FirebaseMobileService
    },
    {
      provide: AuthService,
      useClass: AuthMobileService
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
