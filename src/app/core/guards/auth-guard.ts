import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const usuario = auth.currentUser;

  if (usuario) {
    return true; // Usuario logueado → permitir acceso
  }

  // No logueado → redirigir a login
  router.navigate(['/login']);
  return false;
};
