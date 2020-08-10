import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipsComponent } from './pages/ships/ships.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { AppComponent } from './app.component';
import { PersonsViewComponent } from './pages/persons-view/persons-view.component';
import { ShipsViewComponent } from './pages/ships-view/ships-view.component';
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
