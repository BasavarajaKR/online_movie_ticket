import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    console.log('Form submitted');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);
    
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Clear previous messages
      this.errorMessage = '';
      this.successMessage = '';

      console.log('Attempting login with:', { username, password });

      // Use AuthService for authentication
      this.authService.login({ username, password }).subscribe({
        next: (success) => {
          console.log('Login result:', success);
          if (success) {
            this.successMessage = 'Login successful! Redirecting to dashboard...';
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1500);
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      console.log('Form validation errors:', this.loginForm.errors);
    }
  }
}
