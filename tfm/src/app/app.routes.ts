import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { CompetitionComponent } from './competition/competition.component';
import { TrophyComponent } from './trophy/trophy.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { HorseComponent } from './horse/horse.component';
import { RiderComponent } from './rider/rider.component';
import { ClubComponent } from './club/club.component';
import { LogInComponent } from './log-in/log-in.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewCompetitionComponent } from '@src/app/new-competition/new-competition.component';
import { NewTrophyComponent } from '@src/app/new-trophy/new-trophy.component';
import { NewResultComponent } from '@src/app/new-result/new-result.component';
import { NewClubComponent } from '@src/app/new-club/new-club.component';
import { NewRiderComponent } from '@src/app/new-rider/new-rider.component';
import { NewHorseComponent } from '@src/app/new-horse/new-horse.component';
import { UserComponent } from '@src/app/user/user.component';
import { HorsesComponent } from '@src/app/horses/horses.component';
import { RidersComponent } from '@src/app/riders/riders.component';
import { ClubsComponent } from '@src/app/clubs/clubs.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'competition/:id', component: CompetitionComponent },
  { path: 'trophy/:id', component: TrophyComponent },
  { path: 'result/:id', component: ResultDetailsComponent },
  { path: 'horse/:id', component: HorseComponent },
  { path: 'horses', component: HorsesComponent },
  { path: 'rider/:id', component: RiderComponent },
  { path: 'riders', component: RidersComponent },
  { path: 'club/:id', component: ClubComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'newhorse', component: NewHorseComponent },
  { path: 'newrider', component: NewRiderComponent },
  { path: 'newclub', component: NewClubComponent },
  { path: 'newcompetition', component: NewCompetitionComponent },
  { path: 'newtrophy/:id', component: NewTrophyComponent },
  { path: 'newresult/:id', component: NewResultComponent },
  { path: 'login', component: LogInComponent }, // , canActivate: [SecureInnerPagesGuard]
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];
