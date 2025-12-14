import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Navega a una ruta con un delay opcional.
   * @param route - Ruta de destino
   * @param delay - Tiempo en milisegundos (default: 2000ms)
   */
  navigateWithDelay(route: string, delay: number = 4000): void {
    setTimeout(() => {
      this.router.navigate([route], { replaceUrl: true });
    }, delay);
  }
}
