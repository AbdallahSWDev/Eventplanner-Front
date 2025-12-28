// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  serverError = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.isSubmitting = true;
    this.serverError = '';

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.isSubmitting = false;

        // Accept different possible token field names returned by backend
        const token = res?.token ?? res?.accessToken ?? res?.jwt ?? null;

        console.log('Login response', res, 'resolved token:', token);

        if (token) {
          localStorage.setItem('token', token);
          // navigate to events page
          this.router.navigate(['/events']);
        } else {
          // backend returned something unexpected (still show message)
          alert(res?.message || 'Logged in, but token not provided by backend.');
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.serverError = err.error?.error || err.error?.message || 'Login failed!';
      }
    });
  }
}
