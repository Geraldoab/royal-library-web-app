import { Routes } from '@angular/router';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateBookComponent } from './components/book/create-book/create-book.component';
import { CreateAuthorComponent } from './components/author/create-author/create-author.component';
import { ListAuthorComponent } from './components/author/list-author/list-author.component';
import { ListPublisherComponent } from './components/publisher/list-publisher/list-publisher.component';
import { Component } from '@angular/core';
import { CreatePublisherComponent } from './components/publisher/create-publisher/create-publisher.component';

export const routes: Routes = [
  {
    path: 'menu',
    component: MainMenuComponent
  },
  {
    path: 'books/search',
    component: BooksListComponent
  },
  {
    path: 'books',
    component: CreateBookComponent
  },
  {
    path: 'books/:id',
    component: CreateBookComponent
  },
  {
    path: 'authors',
    component: CreateAuthorComponent
  },
  {
    path: 'authors/search',
    component: ListAuthorComponent
  },
  {
    path: 'publishers',
    component: CreatePublisherComponent
  },
  {
    path: 'publishers/search',
    component: ListPublisherComponent
  },
  /*{
    path: 'authors',
    loadChildren: () => import('./custom-routes/author.routes').then(mod=> mod.AUTHOR_ROUTES)
  },*/
  {
    path: '',
    redirectTo: '/books/search',
    pathMatch: 'full'
  },
  { path: '**',  component: NotFoundComponent }
];
