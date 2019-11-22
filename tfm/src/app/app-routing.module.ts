import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompetitionComponent } from './competition/competition.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'competition/:id', component: CompetitionComponent }
//  { path: 'about',        component: AboutComponent },
//  { path: 'privacy',        component: PrivacyComponent },
//  { path: 'terms',        component: TermsComponent },
//  { path: '',   redirectTo: '/home', pathMatch: 'full' },
//  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
