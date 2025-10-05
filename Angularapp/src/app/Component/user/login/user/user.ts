import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Service/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class User {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }
    this.errorMessage = '';
    const { username, email, password } = this.signupForm.value;
    this.auth.register({ username, email, password }).subscribe({
      next: (ok) => {
        if (ok) {
          this.successMessage = 'Account created. Redirecting...';
          setTimeout(() => this.router.navigate(['/movies']), 1200);
        }
      },
      error: () => this.errorMessage = 'Signup failed. Please try again.'
    });
  }
}
