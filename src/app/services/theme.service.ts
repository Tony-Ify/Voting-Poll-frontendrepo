import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeType>(this.getInitialTheme());
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  private getInitialTheme(): ThemeType {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme: ThemeType = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: ThemeType): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeType): void {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Apply CSS variables based on theme
    this.setThemeVariables(theme);
  }

  private setThemeVariables(theme: ThemeType): void {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    // Light theme colors (default)
    const lightVars = {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f9fafb',
      '--bg-tertiary': '#f3f4f6',
      '--text-primary': '#1f2937',
      '--text-secondary': '#6b7280',
      '--text-tertiary': '#9ca3af',
      '--border-color': '#e5e7eb',
      '--primary-color': '#3b82f6',
      '--secondary-color': '#8b5cf6',
      '--success-color': '#10b981',
      '--danger-color': '#ef4444',
      '--info-color': '#0ea5e9',
    };

    // Dark theme colors
    const darkVars = {
      '--bg-primary': '#1f2937',
      '--bg-secondary': '#111827',
      '--bg-tertiary': '#0f172a',
      '--text-primary': '#f9fafb',
      '--text-secondary': '#d1d5db',
      '--text-tertiary': '#9ca3af',
      '--border-color': '#374151',
      '--primary-color': '#3b82f6',
      '--secondary-color': '#8b5cf6',
      '--success-color': '#10b981',
      '--danger-color': '#ef4444',
      '--info-color': '#0ea5e9',
    };

    const vars = isDark ? darkVars : lightVars;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
}