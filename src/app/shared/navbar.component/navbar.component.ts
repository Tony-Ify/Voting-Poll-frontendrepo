import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  currentUser: User | null = null;
  currentTheme = 'light';
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      isAuth => (this.isAuthenticated = isAuth),
    );

    this.authService.currentUser$.subscribe(
      user => (this.currentUser = user),
    );

    this.themeService.theme$.subscribe(
      theme => (this.currentTheme = theme),
    );
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}