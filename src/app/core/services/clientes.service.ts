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

  getClienteById(id: number):Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  createCliente(cliente: Omit<Cliente, 'id'>):Observable<Cliente> {
    console.log('Enviando al backend: ', cliente);

    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  updateCliente(id: number, cliente: Partial<Cliente>):Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.apiURL}/${id}`, cliente);
  }

  deleteCliente(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }






}
