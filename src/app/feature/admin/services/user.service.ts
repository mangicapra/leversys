import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users?role=2`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }
  editUser(id: number, user: User): Observable<any> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${id}`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
  }
}
