import { Component, Injector, OnInit } from "@angular/core";
import { BaseService } from "src/app/lib/services/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { MatTableDataSource } from "@angular/material/table";
import { DataSource } from "@angular/cdk/table";
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-ships",
  templateUrl: "./ships.component.html",
  styleUrls: ["./ships.component.css"],
})
export class ShipsComponent implements OnInit {
  shipsService: any;
  resShips: any = [];
  pageTitle = "List of Ships";
  dtOptions: DataTables.Settings = {
    "paging":   false,
    "ordering": false,
    "info":     false
  };
  public paginaAtual = 1;
  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
    private authService: AuthService,
    private uiService: UiService,
    private router: Router,
  ) {
    this.shipsService = new BaseService(
      environment.apiSW + "starships",
      injector
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    await this.getAllShips();
  }

  loadShipsData(subRoute?: string) {
    let promise = this.shipsService.getAll(subRoute).toPromise();
    return promise;
  }

  async getAllShips() {
    let count = 1;
    let next: any;
    //esse loop se repete até que o campo "next" do objeto seja nulo
    do {
      let subRoute = "?page=" + count;
      const data = await this.loadShipsData(subRoute);
      let results = data.results;
      this.setResults(results);
      next = data.next;
      count++;
    } while (next);
    await this.setURLInShips();
  }
  setResults(results) {
    for (let item of results) {
      this.resShips.push(item);
    }
  }

  async setURLInShips() {
    for (let id in this.resShips) {
      const shipURL = this.resShips[id].url.split("/");
      const idShips = shipURL[shipURL.length - 2];
      this.resShips[id].url = idShips + "/view";
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
