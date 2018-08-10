import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  author: any = {name: "", quotes : []};
  authorID : any;
  constructor(
    private _httpService: HttpService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.authorID = params['id'];
    });
    this.getAuthor();
  }

  getAuthor() {
    this._httpService.getSingleAuthor(this.authorID)
    .subscribe(data => {
      this.author = data['data'];
    })
  }

  voteUp(quoteId) {
    this._httpService.voteUpQuote(this.author._id, quoteId)
    .subscribe(data => {
      this.getAuthor();
    })
  }

  voteDown(quoteId) {
    this._httpService.voteDownQuote(this.author._id, quoteId)
    .subscribe(data => {
      this.getAuthor();
    });
  }

  delete(quoteId) {
    this._httpService.quoteDelete(this.authorID, quoteId)
    .subscribe(data => {
      this.getAuthor();
    });
  }

}
