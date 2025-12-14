export interface Cliente {
  id: number;
nombre: string;
descripcion: string;
cantidad: number;
tipo: 'punto' | 'gramo';
precioUnitario: number;
precioTotal?: number;
direccion: string;
celular: string;
fecha: string;
tecnica: 'nanoring' | 'microring' | 'cortina cocida' | 'técnica directa';
imagen?: string;
tipoPago?: 'efectivo' | 'transferencia' | 'otro';
}
