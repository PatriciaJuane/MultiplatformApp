import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { CompetitionsComponent } from '@src/app/competitions/competitions.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitionComponent } from '@src/app/competition/competition.component';
import { TrophyComponent } from '@src/app/trophy/trophy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
    ResultDetailsComponent,
    PageNotFoundComponent,
    HorseComponent,
    RiderComponent,
    ClubComponent
  ],
  imports: [
    NativeScriptModule,
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
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
