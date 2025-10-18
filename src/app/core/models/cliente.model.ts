export interface Cliente {
  id: number;
nombre: string;
descripcion: string;
cantidad: number;
tipo: 'punto' | 'gramo';
precioUnitario: number;
precioTotal?: number;
direccion: string;
cel: string;
fecha: string;
tecnica: 'nanoring' | 'microring' | 'cortina cocida' | 'técnica directa';
image?: string;
}
