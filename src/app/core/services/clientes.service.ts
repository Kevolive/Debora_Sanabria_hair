import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiURL = 'https://nexus-nwgg.onrender.com/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getClienteById(id: number):Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}/${id}`);
  }

  createCliente(cliente: Omit<Cliente, 'id'>):Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  updateCliente(id: number, cliente: Partial<Cliente>):Observable<Cliente[]> {
    return this.http.patch<Cliente[]>(`${this.apiURL}/${id}`, cliente);
  }

  deleteCliente(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }



//Cuando quiera usar Mock
// constructor() {}

//   // Datos de ejemplo (mock)
//   private clientesMock: Cliente[] = [
//     {
//       id: 1,
//       nombre: 'Debora Sanabria',
//       tecnica: 'nanoring',
//       tipo: 'punto',
//       cantidad: 100,
//       precioUnitario: 15,
//       precioTotal: 1500,
//       direccion: 'Calle 123 #45-67',
//       celular: '3101234567',
//       descripcion: 'Extensiones de cabello natural',
//       fecha: '2025-10-17',
//       image: 'https://via.placeholder.com/100'
//     }
//   ];

//   getClientes(): Observable<Cliente[]> {
//     return of(this.clientesMock);
//   }

//   getClienteById(id: number): Observable<Cliente | undefined> {
//     return of(this.clientesMock.find(c => c.id === id));
//   }

//   createCliente(cliente: Cliente): Observable<Cliente> {
//     cliente.id = this.clientesMock.length + 1;
//     this.clientesMock.push(cliente);
//     return of(cliente);
//   }

//   updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
//     const index = this.clientesMock.findIndex(c => c.id === id);
//     if (index !== -1) this.clientesMock[index] = cliente;
//     return of(cliente);
//   }

//   deleteCliente(id: number): Observable<void> {
//     this.clientesMock = this.clientesMock.filter(c => c.id !== id);
//     return of(void 0);
//   }
// }


  //Pendientepara cuando se use Nexus Api


}
