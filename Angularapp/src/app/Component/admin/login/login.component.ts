import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Clear previous messages
      this.errorMessage = '';
      this.successMessage = '';

      // Simple validation (replace with API call)
      if (username === 'admin' && password === '1234') {
        this.successMessage = 'Login successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/admin/movie']);
        }, 1500);
      } else {
        this.errorMessage = 'Invalid username or password.';
      }
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }
}


