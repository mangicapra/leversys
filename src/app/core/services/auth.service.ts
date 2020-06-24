import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { tap, mergeMap } from 'rxjs/operators';
import { User } from '@models/user';
import { roles } from '@models/roles';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(body: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, body).pipe(
      mergeMap((response: { accessToken: string }) => {
        localStorage.setItem('accessToken', response.accessToken);
        const USER_INFO = jwt_decode(response.accessToken);
        return this.http
          .get<User>(`${environment.apiUrl}/users/${USER_INFO.sub}`)
          .pipe(
            tap((user: User) => {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('loginTime', JSON.stringify(new Date()));
            })
          );
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get getRole(): string {
    return roles[(JSON.parse(localStorage.getItem('user')) as User).role - 1];
  }
}
