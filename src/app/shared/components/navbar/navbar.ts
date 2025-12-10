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
  
  estaLogueada = false;

  constructor(
    private authService: AuthService,
    private auth: Auth,
    private Router : Router
  ) {

    this.authService.user$.subscribe(user => {
      this.estaLogueada = !!user;
    });

  }
  
  logout() {
    this.authService.logout();
  }

}
