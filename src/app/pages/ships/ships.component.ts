import { Component, Injector, OnInit } from '@angular/core';
import { BaseService } from "src/app/lib/services/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';



@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  shipsService: any;
  resShips: any = [];
  pageTitle = "List of Ships"
  dtOptions: DataTables.Settings = {};
  public paginaAtual = 1;
  constructor(
    protected injector: Injector,
    private cookieService: CookieService,

  ) {
    this.shipsService = new BaseService(environment.apiSW +"starships",injector)

  }

  ngOnInit(): void {
    this.getAllShips();

  }

  loadShipsData(subRoute? : string) {
    let promise = this.shipsService.getAll(subRoute).toPromise();
    return promise;
  }

  async getAllShips() {
    let count = 1;
    let next: any;
        //esse loop se repete até que o campo "next" do objeto seja nulo
    do {
      let subRoute = "?page=" + count
      const data = await this.loadShipsData(subRoute)
      let results = data.results
      this.setResults(results)
      next = data.next
      count++
    } while (next)
    this.resShips = new MatTableDataSource(this.resShips);
  }
  setResults(results) {
    for (let item of results) {
        this.resShips.push(item)
      }
    }


}