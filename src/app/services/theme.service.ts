import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME: ThemeType = 'light';

  private themeSubject = new BehaviorSubject<ThemeType>(this.getStoredTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  getCurrentTheme(): ThemeType {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: ThemeType): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  private getStoredTheme(): ThemeType {
    const stored = localStorage.getItem(this.THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }

    return this.DEFAULT_THEME;
  }

  private applyTheme(theme: ThemeType): void {
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.style.colorScheme = 'light';
    }

    // Apply CSS variables
    const isDark = theme === 'dark';
    htmlElement.style.setProperty(
      '--bg-primary',
      isDark ? '#1a1a1a' : '#ffffff',
    );
    htmlElement.style.setProperty(
      '--bg-secondary',
      isDark ? '#2d2d2d' : '#f5f5f5',
    );
    htmlElement.style.setProperty(
      '--text-primary',
      isDark ? '#ffffff' : '#000000',
    );
    htmlElement.style.setProperty(
      '--text-secondary',
      isDark ? '#b0b0b0' : '#666666',
    );
    htmlElement.style.setProperty(
      '--border-color',
      isDark ? '#404040' : '#e0e0e0',
    );
  }
}