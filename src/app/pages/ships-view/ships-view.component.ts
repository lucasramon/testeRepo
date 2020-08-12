import { Component, Injector, OnInit } from '@angular/core';
import { BaseService } from "src/app/lib/services/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ships-view',
  templateUrl: './ships-view.component.html',
  styleUrls: ['./ships-view.component.css']
})
export class ShipsViewComponent implements OnInit {
  filmsService: any;
  shipsService: any;
  pilotService: any;

  resShips: any = [];

  pageTitle = "Details of "
  paginaAtual = 1
  dtOptions: DataTables.Settings = {
    "paging":   false,
    "ordering": false,
    "info":     false
  };

  protected route: ActivatedRoute;
  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.shipsService = new BaseService(environment.apiSW +"starships/",injector)
    this.filmsService = new BaseService(environment.apiSW + "films/", injector)
    this.pilotService = new BaseService(environment.apiSW + "people", injector)
  }


  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.resShips = await this.getShipById()
    console.log(this.resShips)
  }

  loadShipData(id) {
    let promise = this.shipsService.getById(id).toPromise();
    return promise;
  }

  loadFilmData(link) {
    let promise = this.filmsService.getByLink(link).toPromise();
    return promise;
  }

  loadPilotData(link) {
    let promise = this.pilotService.getByLink(link).toPromise();
    return promise;
  }

  async getShipById() {
    const id = parseInt(this.route.snapshot.url[0].path, 10)
    let ship = await this.loadShipData(id);
    ship.films = await this.getFilms(ship.films)
    ship.pilots = await this.getPilots(ship.pilots)
    return ship
  }

  async getFilms(filmsList) {
    let resFilms:Array<any>=[]
    for (let film of filmsList) {
      resFilms.push(await this.loadFilmData(film))
    }
    return resFilms
  }

 async getPilots(pilotsList) {
   let resPilots: Array<any> = []
   for (let pilot of pilotsList) {
     resPilots.push(await this.loadPilotData(pilot))
   }
   return resPilots
  }

}
