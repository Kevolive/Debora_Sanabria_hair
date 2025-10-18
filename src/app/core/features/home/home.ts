import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../shared/AngularMaterial/material.module';

@Component({
  selector: 'app-home',
  imports: [MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
appTitle = signal('Debora Sanabria Hair');

  // Servicios ofrecidos por el salón
  services = signal([
    { name: 'Coloración y Mechas', description: 'Técnicas Balayage, Ombré y mechas tradicionales.', icon: 'palette' },
    { name: 'Cortes y Peinados', description: 'Cortes modernos, de tendencia y peinados para eventos.', icon: 'content_cut' },
    { name: 'Tratamientos Capilares', description: 'Alisados, Keratina, Botox y terapias de hidratación profunda.', icon: 'local_florist' },
    { name: 'Manicure y Pedicure', description: 'Servicios completos con esmaltado semipermanente.', icon: 'spa' },
  ]);

  // Propiedad computada para el año actual en el footer
  currentYear = computed(() => new Date().getFullYear());

  constructor() {
    // Aquí puedes incluir cualquier lógica de inicialización si fuera necesario
    // Por ejemplo, cargar datos iniciales o manejar la autenticación.
    console.log('Componente de Debora Sanabria Hair cargado para pruebas.');
  }
}
