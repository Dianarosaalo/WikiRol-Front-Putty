import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse, TokenResponse } from '../interfaces/responses';
import { UserLogin,User } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  register(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('users', user);
  }

  login(user: UserLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('users/login', user);
  }
}
