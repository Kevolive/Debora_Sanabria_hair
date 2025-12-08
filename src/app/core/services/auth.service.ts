import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'auth_token';
  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // Aquí iría la lógica real de autenticación, por ahora es un mock
    if (username === 'Debora' && password === '123456') {
      localStorage.setItem(this.TOKEN_KEY, 'token_valido');
      return true;
    }
    return false;
  }

  /**
   * Solo elimina el token de sesión. La navegación debe ser manejada
   * por el componente que llama para permitir mostrar feedback visual
   * (por ejemplo un spinner) antes de redirigir.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

}
