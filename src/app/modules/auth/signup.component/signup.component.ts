import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

const STATES = [
  'Lagos', 'Abuja', 'Kano', 'Kaduna', 'Enugu', 'Port Harcourt',
  'Ibadan', 'Benin City', 'Jos', 'Katsina', 'Owerri', 'Abeokuta',
  'Osogbo', 'Ilorin', 'Lokoja', 'Akure', 'Calabar', 'Umuahia',
  'Yenagoa', 'Asaba', 'Maiduguri', 'Gusau', 'Birnin Kebbi', 'Gombe',
  'Damaturu', 'Makurdi', 'Lafia', 'Bauchi', 'Dutse', 'Federal Capital Territory',
];

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;
  states = STATES;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        state: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .signUp(
        this.f['name'].value,
        this.f['email'].value,
        this.f['password'].value,
        this.f['state'].value,
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'Signup failed';
        },
      });
  }
}