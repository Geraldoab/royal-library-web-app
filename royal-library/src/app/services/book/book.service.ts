import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { BookDataTransferObject } from '../../model/book-data-transfer-object';
import { Observable } from 'rxjs';
import { BookFilter } from '../../model/book-filter';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private readonly BOOKS_URL = environment.BOOKS_API_URL;

  getBooks(filter: BookFilter) : Observable<BookDataTransferObject[]> {
    return this.http.get<BookDataTransferObject[]>(`${this.BOOKS_URL}?searchBy=${filter.searchBy}&searchValue=${filter.searchValue}`)
  }
}
