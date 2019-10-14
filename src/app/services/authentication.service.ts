import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Constants
import { environment } from '../../environments/environment';

// Interfaces
import { User } from '../interfaces/user';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;
  
  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  login(user: User) {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic dXNlckFwaToxMjM0NTY=')

    const data = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('grant_type', 'password');

    return this.http.post<Token>(`${environment.auth}/oauth/token`, data, { headers })
      .pipe(map(token => {
        localStorage.setItem('currentToken', JSON.stringify(token));
        this.currentTokenSubject.next(token);
        return token;
      }));
  }

  register(user: User) {
     return this.http.post<any>(`${environment.api}/api/users/register`, user)
      .pipe(map(res => {
        return res;
      }));
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }
}
