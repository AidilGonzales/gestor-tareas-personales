import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(
    private authService: AuthService,
    private auth: Auth,
    private Router : Router
  ) {}

  // ⭐ Forma cor recta de saber si hay usuario logueado
  get estaLogueada() {
    return this.auth.currentUser !== null;
  }

  logout() {
    this.authService.logout();
  }
}
