import { UiService } from './services/ui.service';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { ShipsComponent } from './pages/ships/ships.component';
import { PersonsViewComponent } from './pages/persons-view/persons-view.component';
import { ShipsViewComponent } from './pages/ships-view/ships-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ToasterModule, ToasterService } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    ShipsComponent,
    PersonsViewComponent,
    ShipsViewComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DataTablesModule,
    NgxPaginationModule,
    MaterialModule,
    ToasterModule.forRoot(),
  ],
  providers: [DatePipe, AuthService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
