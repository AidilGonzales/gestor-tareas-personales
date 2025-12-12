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

  login() {
    this.errorMsg = '';

    this.auth.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.errorMsg = 'El usuario no está registrado.';
        } else if (err.code === 'auth/wrong-password') {
          this.errorMsg = 'La contraseña es incorrecta.';
        } else {
          this.errorMsg = 'Error al iniciar sesión. Intenta nuevamente.';
        }
      });
}





}
