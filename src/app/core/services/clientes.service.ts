import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


constructor() {}

  // Datos de ejemplo (mock)
  private clientesMock: Cliente[] = [
    {
      id: 1,
      nombre: 'Debora Sanabria',
      tecnica: 'nanoring',
      tipo: 'punto',
      cantidad: 100,
      precioUnitario: 15,
      precioTotal: 1500,
      direccion: 'Calle 123 #45-67',
      cel: '3101234567',
      descripcion: 'Extensiones de cabello natural',
      fecha: '2025-10-17',
      image: 'https://via.placeholder.com/100'
    }
  ];

  getClientes(): Observable<Cliente[]> {
    return of(this.clientesMock);
  }

  getClienteById(id: number): Observable<Cliente | undefined> {
    return of(this.clientesMock.find(c => c.id === id));
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    cliente.id = this.clientesMock.length + 1;
    this.clientesMock.push(cliente);
    return of(cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    const index = this.clientesMock.findIndex(c => c.id === id);
    if (index !== -1) this.clientesMock[index] = cliente;
    return of(cliente);
  }

  deleteCliente(id: number): Observable<void> {
    this.clientesMock = this.clientesMock.filter(c => c.id !== id);
    return of(void 0);
  }



  //Pendientepara cuando se use Nexus Api

  // private apiURL = 'https://nexus-nwgg.onrender.com/clientes';

  // constructor(private http: HttpClient) { }

  // getClientes() {
  //   return this.http.get(this.apiURL);
  // }

  // getClienteById(id: number) {
  //   return this.http.get(`${this.apiURL}/${id}`);
  // }

  // createCliente(cliente: any) {
  //   return this.http.post(this.apiURL, cliente);
  // }

  // updateCliente(id: number, cliente: Cliente) {
  //   return this.http.put(`${this.apiURL}/${id}`, cliente);
  // }

  // deleteCliente(id: number) {
  //   return this.http.delete(`${this.apiURL}/${id}`);
  // }

}
