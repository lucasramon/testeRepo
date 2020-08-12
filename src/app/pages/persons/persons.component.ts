import { UiService } from './../../services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, Injector, OnInit } from "@angular/core";
import { BaseService } from "src/app/lib/services/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  personService: any;
  homeWorldService: any;
  resPersons: any=[];
  resHomeWorlds: any = [];
  pageTitle = "List of Persons"
  public paginaAtual = 1;

  dtOptions: DataTables.Settings = {
    "paging":   false,
    "ordering": false,
    "info":     false
  };
  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
    private authService: AuthService,
    private uiService: UiService,
    private router: Router,

  ) {
    this.personService = new BaseService(environment.apiSW + "people", injector)
    this.homeWorldService = new BaseService(environment.apiSW +"planets",injector)

  }

  ngOnInit(): void {
    this.loadData()

  }

  async loadData() {
    await this.getAllHomeWorlds()
    await this.getAllPersons()
  }

  loadPersonsData(subRoute) {
    let promise = this.personService.getAll(subRoute).toPromise();
    return promise;
  }

  loadHomeWorldData(subRoute) {
    let promise = this.homeWorldService.getAll(subRoute).toPromise();
    return promise
  }

  async getAllHomeWorlds() {
    let count = 1;
    let next: any;
    //esse loop se repete até que o campo "next" do objeto seja nulo
    do {
      let subRoute = "?page=" + count
      const data = await this.loadHomeWorldData(subRoute)
      await this.setResults(data,this.resHomeWorlds)
      next = data.next
      count++
    } while (next)
  }


  async getAllPersons() {
    let count = 1;
    let next: any;
    //esse loop se repete até que o campo "next" do objeto seja nulo
    do {
      let subRoute = "?page=" + count
      const data = await this.loadPersonsData(subRoute)
      await this.setResults(data,this.resPersons)
      next = data.next
      count++
    } while (next)
    await this.setURLInPerson()
    await this.setHomeWorldDataInPerson()
  }

  async setResults(data,resources) {
    let results = data.results
    for (let item of results) {
      resources.push(item)
    }

    }

    async setURLInPerson() {
      for (let id in this.resPersons) {
        const personURL = this.resPersons[id].url.split("/")
        const idPerson = personURL[personURL.length -2 ]
        this.resPersons[id].url = idPerson + '/view'
      }
    }
  
  async setHomeWorldDataInPerson() {
    for (let id in this.resPersons) {
      const homeWorldURL = this.resPersons[id].homeworld.split("/")
      const idHomeWorld = homeWorldURL[homeWorldURL.length -2 ]
      this.resPersons[id].homeworld = this.resHomeWorlds[idHomeWorld-1]
    }
  }

  async seeDetails(url: string): Promise<void> {

    if (this.authService.userIsLoggedIn()) {
      this.router.navigateByUrl('persons/' + url);
    } else {
      this.uiService.showInfo('Not authenticaded', 'Please login to see the details.');
      this.router.navigateByUrl('login');
    }

  }

}
