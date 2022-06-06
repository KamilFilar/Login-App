import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private baseURL: string = "api/auth/login";
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public signIn(login: string, pass: string): Observable<any> {

    const body = JSON.stringify({
      username: login,
      password: pass
    })
    
    return this.http.post(this.baseURL, body, { headers: this.headers, observe: 'response'});
  }

  public logOut(): void {
    this.cookieService.delete("access_token");
    this.router.navigate(['login'], { relativeTo: this.route })
  }
}
