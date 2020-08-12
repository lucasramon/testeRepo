import { Component, Injector, OnInit } from '@angular/core';
import { BaseService } from "src/app/lib/services/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-persons-view',
  templateUrl: './persons-view.component.html',
  styleUrls: ['./persons-view.component.css']
})
export class PersonsViewComponent implements OnInit {

  protected route: ActivatedRoute;
  filmsService: any;
  shipsService: any;
  specieService: any;
  vehicleService: any;
  personService: any;
  homeWorldService: any;
  resPerson: any;
  pageTitle = "Details of "
  paginaAtual = 1
  dtOptions: DataTables.Settings = {
    "paging":   false,
    "ordering": false,
    "info":     false
  };

  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
  ) {
    this.route = this.injector.get(ActivatedRoute);

    this.personService = new BaseService(environment.apiSW +"people/",injector)
    this.shipsService = new BaseService(environment.apiSW +"starships/",injector)
    this.filmsService = new BaseService(environment.apiSW + "films/", injector)
    this.specieService = new BaseService(environment.apiSW + "species/", injector)
    this.vehicleService = new BaseService(environment.apiSW + "vehicles/", injector)
    this.homeWorldService = new BaseService(environment.apiSW +"planets",injector)

  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.resPerson = await this.getPersonById()
    console.log(this.resPerson)
  }

  loadPersonData(id) {
    let promise = this.personService.getById(id).toPromise();
    return promise;
  }

  loadFilmData(link) {
    let promise = this.filmsService.getByLink(link).toPromise();
    return promise;
  }

  loadShipData(link) {
    let promise = this.shipsService.getByLink(link).toPromise();
    return promise;
  }

  loadSpecieData(link) {
    let promise = this.specieService.getByLink(link).toPromise();
    return promise;
  }

  loadVehicleData(link) {
    let promise = this.vehicleService.getByLink(link).toPromise();
    return promise;
  }

  loadHomeWorldData(link) {
    let promise = this.homeWorldService.getByLink(link).toPromise();
    return promise;
  }


  async getPersonById() {
    const id = parseInt(this.route.snapshot.url[0].path, 10)
    let person = await this.loadPersonData(id);
    person.films = await this.getFilms(person.films);
    person.starships = await this.getShips(person.starships);
    person.species = await this.getSpecies(person.species);
    person.vehicles = await this.getVehicles(person.vehicles);
    person.homeworld = await this.getHomeWorld(person.homeworld);
    return person
  }

  async getFilms(filmsList) {
    let resFilms:Array<any>=[]
    for (let film of filmsList) {
      resFilms.push(await this.loadFilmData(film))
    }
    return resFilms
  }

 async getShips(shipsList) {
   let resShips: Array<any> = []
   for (let ship of shipsList) {
     resShips.push(await this.loadShipData(ship))
   }
   return resShips
 }

 async getSpecies(speciesList) {
  let resSpecies: Array<any> = []
  for (let specie of speciesList) {
    resSpecies.push(await this.loadSpecieData(specie))
  }
  return resSpecies
 }

 async getVehicles(vehiclesList) {
  let resVehicles: Array<any> = []
  for (let vehicle of vehiclesList) {
    resVehicles.push(await this.loadVehicleData(vehicle))
  }
  return resVehicles
 }

 async getHomeWorld(homeWorld) {
    let resHomeWorld = await this.loadHomeWorldData(homeWorld)
    return resHomeWorld
  }

}
