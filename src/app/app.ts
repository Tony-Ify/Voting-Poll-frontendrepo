import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Poll & Voting System';
  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.currentUser$;
  currentTheme$ = this.themeService.theme$;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Verify token on app load
    this.authService.verifyToken();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}