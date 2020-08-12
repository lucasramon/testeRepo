import { AuthenticatedGuard } from './guards/authenticated.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipsComponent } from './pages/ships/ships.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { PersonsViewComponent } from './pages/persons-view/persons-view.component';
import { ShipsViewComponent } from './pages/ships-view/ships-view.component';
import { HomeComponent } from './pages/home/home.component'
import { HomeSelectorComponent } from './pages/home-selector/HomeSelector.component'

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'login/:redirectUrl', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  {

    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeSelectorComponent
      },
      {
        path: 'persons',
        children: [
          {
            path: '',
            component: PersonsComponent,
          },
          {
            path: ':id/view',
            component: PersonsViewComponent,
            canActivate: [AuthenticatedGuard]
          },
        ],
      },

      {
        path: 'ships',
        children: [
          {
            path: '',
            component: ShipsComponent,
          },
          {
            path: ':id/view',
            component: ShipsViewComponent,
            canActivate: [AuthenticatedGuard]
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
