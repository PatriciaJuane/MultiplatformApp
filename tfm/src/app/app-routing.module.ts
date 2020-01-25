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
import { NewHorseComponent } from './new-horse/new-horse.component';
import { NewRiderComponent } from './new-rider/new-rider.component';
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { NewClubComponent } from './new-club/new-club.component';
import { NewTrophyComponent } from './new-trophy/new-trophy.component';
import { NewResultComponent } from './new-result/new-result.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { routes } from './app.routes';


/* const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'competition/:id', component: CompetitionComponent },
  { path: 'trophy/:id', component: TrophyComponent },
  { path: 'result/:id', component: ResultDetailsComponent },
  { path: 'horse/:id', component: HorseComponent },
  { path: 'rider/:id', component: RiderComponent },
  { path: 'club/:id', component: ClubComponent },
  { path: 'newhorse', component: NewHorseComponent },
  { path: 'newrider', component: NewRiderComponent },
  { path: 'newclub', component: NewClubComponent },
  { path: 'newcompetition', component: NewCompetitionComponent },
  { path: 'newtrophy/:id', component: NewTrophyComponent },
  { path: 'newresult/:id', component: NewResultComponent },
  { path: 'login', component: LogInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
]; */
//  { path: 'about',        component: AboutComponent },
//  { path: 'privacy',        component: PrivacyComponent },
//  { path: 'terms',        component: TermsComponent },



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
