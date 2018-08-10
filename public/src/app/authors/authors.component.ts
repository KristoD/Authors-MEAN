import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors : any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    let obs = this._httpService.getAuthors();
    obs.subscribe(data => {
      this.authors = data['data'];
    });
  }

  onEditClick(id) {
    this._router.navigate(['/edit/' + id]);
  }
}
