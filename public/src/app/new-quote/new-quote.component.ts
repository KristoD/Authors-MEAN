import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {
  author: any = {name: ""};
  quote: any = {content: ""};
  authorID : any;
  constructor(
    private _httpService: HttpService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      let obs = this._httpService.getSingleAuthor(params['id']);
      this.authorID = params['id']
      obs.subscribe(data => {
        this.author = data['data']
      });
    });
  }

  onSubmit() {
    let obs = this._httpService.createQuote(this.authorID, this.quote);
    obs.subscribe(data => {
      this.quote = {content: ""}
      this._router.navigate(['/quotes', this.author._id])
    });
  }

}
