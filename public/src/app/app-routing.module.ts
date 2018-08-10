import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAuthorComponent } from './new-author/new-author.component';
import { AuthorsComponent } from './authors/authors.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';

const routes: Routes = [
  {path: 'new', component: NewAuthorComponent},
  {path: '', component: AuthorsComponent},
  {path: 'edit/:id', component: EditAuthorComponent},
  {path: 'quotes/:id', component: QuotesComponent},
  {path: 'quotes/new/:id', component: NewQuoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
