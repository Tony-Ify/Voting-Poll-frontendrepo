import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';

const STATES = [
  'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE',
  'BORNO', 'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU',
  'GOMBE', 'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA', 'KEBBI',
  'KOGI', 'KWARA', 'LAGOS', 'NASARAWA', 'NIGER', 'OGUN', 'ONDO',
  'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA',
  'YOBE', 'ZAMFARA'
];

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: User | null = null;
  loading = false;
  submitted = false;
  error: string | null = null;
  success: string | null = null;
  editMode = false;
  states = STATES;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.initializeForm(user);
      }
    });
  }

  initializeForm(user: User): void {
    this.profileForm = this.formBuilder.group({
      name: [user.name, [Validators.required, Validators.minLength(2)]],
      email: [user.email, [Validators.required, Validators.email]],
      state: [user.state, Validators.required],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.submitted = false;
    this.error = null;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;
    this.success = null;

    if (this.profileForm.invalid || !this.user) {
      return;
    }

    this.loading = true;

    // Here you would call the API to update user profile
    // For now, just show success message
    setTimeout(() => {
      this.loading = false;
      this.success = 'Profile updated successfully';
      this.editMode = false;
      this.submitted = false;
    }, 1000);
  }

  logout(): void {
    this.authService.logout();
  }
}