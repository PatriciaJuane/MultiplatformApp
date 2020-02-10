import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { CompetitionsComponent } from '@src/app/competitions/competitions.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
  MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
  MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CompetitionComponent } from '@src/app/competition/competition.component';
import { TrophyComponent } from '@src/app/trophy/trophy.component';
import { MinutesSecondsPipe } from '@src/app/models/MinutesSecondsPipe';
import { ResultDetailsComponent } from '@src/app/result-details/result-details.component';
import { PageNotFoundComponent } from '@src/app/page-not-found/page-not-found.component';
import { HorseComponent } from '@src/app/horse/horse.component';
import { RiderComponent } from '@src/app/rider/rider.component';
import { ClubComponent } from '@src/app/club/club.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '@src/environments/environment';
import { NewHorseComponent } from '@src/app/new-horse/new-horse.component';
import { NewRiderComponent } from '@src/app/new-rider/new-rider.component';
import { NewCompetitionComponent } from '@src/app/new-competition/new-competition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClubComponent } from '@src/app/new-club/new-club.component';
import { NewTrophyComponent } from '@src/app/new-trophy/new-trophy.component';
import { NewResultComponent } from '@src/app/new-result/new-result.component';
import { LogInComponent } from '@src/app/log-in/log-in.component';
import { UserComponent } from '@src/app/user/user.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseService } from '@src/app/services/firebase.service';
import { FirebaseWebService } from '@src/app/services/firebaseweb.service';
import { AuthService } from '@src/app/services/authentication.service';
import { AuthWebService } from '@src/app/services/authenticationweb.service.';
import { HorsesComponent } from '@src/app/horses/horses.component';
import { RidersComponent } from '@src/app/riders/riders.component';
import { ClubsComponent } from '@src/app/clubs/clubs.component';
import { AboutComponent } from '@src/app/about/about.component';
import { WebComponent } from '@src/app/web/web.component';

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
    NewCompetitionComponent,
    NewClubComponent,
    NewTrophyComponent,
    NewResultComponent,
    LogInComponent,
    UserComponent,
    HorsesComponent,
    RidersComponent,
    ClubsComponent,
    AboutComponent,
    WebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  providers: [
    {
      provide: FirebaseService,
      useClass: FirebaseWebService
    },
    {
      provide: AuthService,
      useClass: AuthWebService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
