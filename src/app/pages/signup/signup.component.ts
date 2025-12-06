import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  birthDate = '';
  email = '';
  password = '';
  confirmPassword = '';
  serverError = '';
  successMessage = '';
  passwordMismatch = false;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  checkPasswordMatch() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  onSignup() {
    this.serverError = '';
    this.successMessage = '';
    this.isSubmitting = true;

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.isSubmitting = false;
      return;
    }

    const userData = {
      name: `${this.firstName} ${this.lastName}`,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate
    };

    this.authService.register(userData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.successMessage = res?.message || 'Signup successful!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.serverError = err?.error?.error || 'Signup failed';
      }
    });
  }
}
