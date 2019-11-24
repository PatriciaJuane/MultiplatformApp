import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { TrophyComponent } from './trophy/trophy.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HorseComponent } from './horse/horse.component';
import { RiderComponent } from './rider/rider.component';
import { ClubComponent } from './club/club.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'competition/:id', component: CompetitionComponent },
  { path: 'trophy/:id', component: TrophyComponent },
  { path: 'result/:id', component: ResultDetailsComponent },
  { path: 'horse/:id', component: HorseComponent },
  { path: 'rider/:id', component: RiderComponent },
  { path: 'club/:id', component: ClubComponent },
  { path: '**', component: PageNotFoundComponent }
//  { path: 'about',        component: AboutComponent },
//  { path: 'privacy',        component: PrivacyComponent },
//  { path: 'terms',        component: TermsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
