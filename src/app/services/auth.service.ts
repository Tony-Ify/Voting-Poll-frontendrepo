import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  state: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  state: string;
  role: string;
  accessToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
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
        tap(response => this.handleAuthResponse(response)),
        catchError(error => this.handleError(error)),
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => this.handleError(error)),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  verifyToken(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }

    this.http
      .get<{ valid: boolean }>(`${this.apiUrl}/verify`)
      .pipe(
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Token invalid'));
        }),
      )
      .subscribe();
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleAuthResponse(response: AuthResponse): void {
    const user: User = {
      id: response.id,
      name: response.name,
      email: response.email,
      state: response.state,
      role: response.role as 'user' | 'admin',
    };

    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.statusText || errorMessage;
    }

    return throwError(() => new Error(errorMessage));
  }
}