import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http : HttpClient) { }

  getAuthors() {
    return this._http.get('/api/authors');
  }

  getSingleAuthor(id) {
    return this._http.get('/api/author/' + id);
  }

  createAuthor(author) {
    return this._http.post('/api/new', author);
  }

  updateAuthor(id, author) {
    return this._http.put('/api/edit/' + id, author);
  }

  createQuote(id, quote) {
    return this._http.post('/api/newQuote/' + id, quote);
  }

  deleteAuthor(id) {
    return this._http.delete('/api/delete/' + id);
  }

  voteUpQuote(authorId, quoteId) {
    return this._http.post('/api/author/' + authorId + '/quote/' + quoteId, {vote: "up"});
  }
  voteDownQuote(authorId, quoteId) {
    return this._http.post('/api/author/' + authorId + '/quote/' + quoteId, {vote: "down"});
  }

  quoteDelete(authorId, quoteId) {
    return this._http.delete('/api/delete/author/' + authorId + '/quote/' + quoteId);
  }

}
