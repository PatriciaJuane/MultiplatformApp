import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { CompetitionsComponent } from '@src/app/competitions/competitions.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CompetitionComponent } from '@src/app/competition/competition.component';
import { TrophyComponent } from '@src/app/trophy/trophy.component';
import { MinutesSecondsPipe } from '@src/app/models/MinutesSecondsPipe';
import { ResultDetailsComponent } from '@src/app/result-details/result-details.component';
import { PageNotFoundComponent } from '@src/app/page-not-found/page-not-found.component';
import { HorseComponent } from '@src/app/horse/horse.component';
import { RiderComponent } from '@src/app/rider/rider.component';
import { ClubComponent } from '@src/app/club/club.component';

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
    ClubComponent
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
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
