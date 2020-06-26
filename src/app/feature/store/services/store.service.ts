import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getSingleBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  changeCopiesNumber(id: number, inStock: number): Observable<Book> {
    return this.http.patch<Book>(`${environment.apiUrl}/books/${id}`, {
      inStock,
    });
  }
}
