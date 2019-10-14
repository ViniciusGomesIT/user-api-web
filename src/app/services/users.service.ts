import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Constants
import { environment } from '../../environments/environment';

// Interfaces
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${environment.api}/api/users/`);
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.api}/api/users/${user.id}`, user);
  }
}
