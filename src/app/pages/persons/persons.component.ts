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
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 10,

  };;
  constructor(
    protected injector: Injector,
    private cookieService: CookieService,

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
    await this.setHomeWorldDataInPerson()
    console.log(this.resPersons)
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

  }

  async setResults(data,resources) {
    let results = data.results
    for (let item of results) {
      resources.push(item)
    }

    }

  async setHomeWorldDataInPerson() {
    for (let id in this.resPersons) {
      const homeWorldURL = this.resPersons[id].homeworld.split("/")
      const idHomeWorld = homeWorldURL[homeWorldURL.length -2 ]
      this.resPersons[id].homeworld = this.resHomeWorlds[idHomeWorld-1]
    }
  }

}
