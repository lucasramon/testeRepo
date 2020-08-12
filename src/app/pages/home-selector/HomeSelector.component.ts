import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-homeSelector',
  templateUrl: './HomeSelector.component.html',
  styleUrls: ['./HomeSelector.component.css']
})
export class HomeSelectorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goto(url) {
    this.router.navigateByUrl(url).then((e) => {
      if(e) {
        console.log(url, "sucess");
      } else {
        console.log(url, "fail");
      }
    });
  }
}
