import { Routes } from '@angular/router';

// TAREAS
import { Lista} from './pages/tareas/lista/lista';
import { Detalle } from './pages/tareas/detalle/detalle';
import { Formulario } from './pages/tareas/formulario/formulario';

// CATEGORÍAS
import { Categorias } from './pages/categorias/categorias';

// ESTADÍSTICAS
import { Estadisticas } from './pages/estadisticas/estadisticas';

// AUTH
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// GUARD
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },

  // AUTH
  { path: 'login', component: Login},
  { path: 'register', component: Register },

  // TAREAS
  { path: 'tareas', component: Lista, canActivate: [authGuard] },
  { path: 'tareas/nueva', component: Formulario, canActivate: [authGuard] },
  { path: 'tareas/:id', component: Detalle, canActivate: [authGuard] },

  // CATEGORIAS
  { path: 'categorias', component: Categorias, canActivate: [authGuard] },

  // ESTADÍSTICAS
  { path: 'estadisticas', component: Estadisticas, canActivate: [authGuard] },

  // 404
  { path: '**', redirectTo: 'tareas' }
];
