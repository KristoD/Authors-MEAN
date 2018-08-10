import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService : HttpService){}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    let obs = this._httpService.getAuthors();
    obs.subscribe(data => {
      console.log(data);
    });
  }
}
