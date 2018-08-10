import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  author : any;
  authorID : any;
  validation : boolean;
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.author = {name: ""}
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.authorID = params['id']
      let obs = this._httpService.getSingleAuthor(params['id']);
      obs.subscribe(data => {
        this.author = data['data'];
      });
    });
  }

  onSubmit() {
    let obs = this._httpService.updateAuthor(this.authorID, this.author);
    obs.subscribe(data => {
      if(this.author.name.length < 3) {
        this.validation = false;
      } else {
        this.validation = true;
        this.ngOnInit();
      }
    });
  }
}
