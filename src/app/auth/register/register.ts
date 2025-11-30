import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    try {
      await this.auth.register(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }
}
