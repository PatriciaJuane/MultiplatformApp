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
import { MinutesSecondsPipe } from '@src/app/models/MinutesSecondsPipe';
import { AppRoutingModule } from '@src/app/app-routing.module.tns';
import { FirebaseService } from '@src/app/services/firebase.service';
import { FirebaseMobileService } from '@src/app/services/firebasemobile.service';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NewCompetitionComponent } from '@src/app/new-competition/new-competition.component.tns';
import { NewTrophyComponent } from '@src/app/new-trophy/new-trophy.component.tns';
import { NewResultComponent } from '@src/app/new-result/new-result.component.tns';
import { DropDownModule } from 'nativescript-drop-down/angular';
import { NewClubComponent } from '@src/app/new-club/new-club.component.tns';
import { NewRiderComponent } from '@src/app/new-rider/new-rider.component.tns';
import { NewHorseComponent } from '@src/app/new-horse/new-horse.component.tns';
import { AuthMobileService } from '@src/app/services/authenticationmobile.service';
import { AuthService } from '@src/app/services/authentication.service';
import { UserComponent } from '@src/app/user/user.component.tns';
import { HorsesComponent } from '@src/app/horses/horses.component';
import { RidersComponent } from '@src/app/riders/riders.component';
import { ClubsComponent } from '@src/app/clubs/clubs.component';
import { AboutComponent } from '@src/app/about/about.component';

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
    NewCompetitionComponent,
    HorsesComponent,
    RidersComponent,
    ClubsComponent,
    AboutComponent
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
