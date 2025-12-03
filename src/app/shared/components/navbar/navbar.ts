import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(private auth: AuthService, private router: Router) {}

  get estaLogueada() {
    return this.auth.currentUser !== null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
