import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, provideHttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Author } from '../../model/author';
import { Observable, retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  private readonly AUTHORS_URL = environment.AUTHORS_API_URL;

  getAll() : Observable<Author[]> {
    return this.http.get<Author[]>(this.AUTHORS_URL)
  }

  create(author: Author) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.AUTHORS_URL, author, {observe: 'response'})
  }

  edit(author: Author) : Observable<any> {
    const url = `${this.AUTHORS_URL}/${author.id}`
    return this.http.put<any>(url, author, {observe: 'response'})
  }

  delete(id: number) : Observable<any> {
    const url = `${this.AUTHORS_URL}/${id}`
    return this.http.delete<any>(url, {observe: 'response'})
  }

  getById(id: number) : Observable<any> {
    const url = `${this.AUTHORS_URL}/${id}`
    return this.http.get<any>(url, {observe: 'response'})
  }
}
