import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions, HttpResponse, provideHttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Observable, retryWhen } from 'rxjs';
import { Publisher } from '../../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  private readonly PUBLISHERS_URL = environment.PUBLISHERS_API_URL;

  getAll() : Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.PUBLISHERS_URL)
  }

  create(publisher: Publisher) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.PUBLISHERS_URL, publisher, {observe: 'response'})
  }

  edit(publisher: Publisher) : Observable<any> {
    const url = `${this.PUBLISHERS_URL}/${publisher.id}`
    return this.http.put<any>(url, publisher)
  }

  delete(id: number) : Observable<any> {
    const url = `${this.PUBLISHERS_URL}/${id}`
    return this.http.delete<any>(url)
  }

  getById(id: number) : Observable<any> {
    const url = `${this.PUBLISHERS_URL}/${id}`
    return this.http.get<any>(url)
  }
}
