import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {

  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/tareas']);
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }
}
