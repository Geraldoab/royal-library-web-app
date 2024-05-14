import { Routes } from '@angular/router';
import { CreateAuthorComponent } from '../components/author/create-author/create-author.component';
import { ListAuthorComponent } from '../components/author/list-author/list-author.component';

export const AUTHOR_ROUTES: Routes = [
  {
    path: 'authors',
    component: CreateAuthorComponent
  },
  {
    path: 'authors/search',
    component: ListAuthorComponent
  }
]
