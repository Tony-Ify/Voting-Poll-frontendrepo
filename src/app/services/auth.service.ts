import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  state: string;
  role: string;
  accessToken: string;
  expiresIn: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  state: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!this.getToken(),
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.verifyToken();
  }

  signUp(
    name: string,
    email: string,
    password: string,
    state: string,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signup`, {
        name,
        email,
        password,
        state,
      })
      .pipe(
        map(response => {
          this.setSession(response);
          return response;
        }),
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          this.setSession(response);
          return response;
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {})
      .pipe(
        map(response => {
          this.setToken(response.accessToken);
          return response;
        }),
      );
  }

  private setSession(response: AuthResponse): void {
    const user: User = {
      id: response.id,
      name: response.name,
      email: response.email,
      state: response.state,
      role: response.role,
    };
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private verifyToken(): void {
    if (this.getToken()) {
      this.http
        .get<{ valid: boolean; user: User }>(`${this.apiUrl}/verify`)
        .subscribe(
          response => {
            this.currentUserSubject.next(response.user);
            this.isAuthenticatedSubject.next(true);
          },
          error => {
            this.logout();
          },
        );
    }
  }
}