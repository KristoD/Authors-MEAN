import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  author : any;
  validation : boolean;
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.author = {name : ""}
  }

  onSubmit() {
    let obs = this._httpService.createAuthor(this.author);
    obs.subscribe(data => {
      if(this.author.name.length < 3) {
        this.validation = false;
      } else {
        this.validation = true;
        this._router.navigate(['/']);
        this.author = {name : ""}
      }
    });
  }
}
