import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  private baseURL: string = 'api/user/';
  private headers = new HttpHeaders({
    Authorization: this.cookieService.get('access_token'),
  });

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService
  ) {}

  getAllUsers(): Observable<User> {
    return this.http.get<User>(this.baseURL + 'all', {
      headers: this.headers,
    });
  }

  getUserByID(id: number): Observable<User> {
    return this.http.get<User>(this.baseURL + id.toString(), {
      headers: this.headers,
    });
  }

  getUserRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + 'roles', {
      headers: this.headers,
    });
  }

  updateUser(
    id: number,
    username: string,
    email: string,
    role: string
  ): Observable<User> {

    const body = {
      id: id,
      username: username,
      email: email,
      roles: role
    }

    return this.http.patch<User>(this.baseURL + id.toString(), body, {
      headers: this.headers,
    });
  }
}
