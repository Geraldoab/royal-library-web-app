import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, provideHttpClient } from '@angular/common/http'
import { BookDataTransferObject } from '../../model/book-data-transfer-object';
import { Observable, retryWhen } from 'rxjs';
import { BookFilter } from '../../model/book-filter';
import { environment } from '../../../environments/environment';
import { Book } from '../../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private readonly BOOKS_URL = environment.BOOKS_API_URL;

  getAll(filter: BookFilter) : Observable<BookDataTransferObject[]> {
    return this.http.get<BookDataTransferObject[]>(`${this.BOOKS_URL}?searchBy=${filter.searchBy}&searchValue=${filter.searchValue}`)
  }

  create(book: Book) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.BOOKS_URL, book, { observe: 'response' })
  }

  edit(book: Book) : Observable<HttpResponse<any>> {
    const url = `${this.BOOKS_URL}/${book.id}`
    return this.http.put<HttpResponse<any>>(url, book, { observe: 'response' })
  }

  delete(id: number) : Observable<HttpResponse<any>> {
    const url = `${this.BOOKS_URL}/${id}`
    return this.http.delete<HttpResponse<any>>(url, { observe: 'response' })
  }

  getById(id: number) : Observable<HttpResponse<any>> {
    const url = `${this.BOOKS_URL}/${id}`
    return this.http.get<HttpResponse<any>>(url, { observe: 'response' })
  }
}
