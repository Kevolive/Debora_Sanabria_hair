import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //Si no está autenticado, ir al login

  if(!authService.isAuthenticated()){
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }


  //Si está autenticado, permitir acceso
  return true;
};

export const noAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //Si ya estpa auth, no ir al login

  if(authService.isAuthenticated()){
    router.navigate(['/clientes'], { replaceUrl: true });
    return false;
  }

  return true;
}
