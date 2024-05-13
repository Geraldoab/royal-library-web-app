import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

export const routes: Routes = [
  {
    path: 'menu',
    //loadChildren: () => import('./components/main-menu/main-menu.component').then(mod => mod.MainMenuComponent)
    component: MainMenuComponent
  },
  {
    path: 'books',
    component: BooksListComponent
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },

  //{ path: '**',  component: BooksListComponent }*/
];
