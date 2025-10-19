
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/AngularMaterial/material.module';
import { ClientesService } from '../../../../services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../../models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteForm } from '../../components/cliente-form/cliente-form';



@Component({
  selector: 'app-cliente-table',
  imports: [CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './cliente-table.html',
  styleUrls: ['./cliente-table.scss']
})
export class ClienteTable {

  displayedColumns: string[] = ['id', 'nombre', 'tecnica', 'tipo', 'cantidad', 'precioUnitario', 'precioTotal', 'direccion', 'celular', 'descripcion', 'fecha', 'image', 'acciones'];


  private clientesService = inject(ClientesService);
  private dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Cliente>([]);

  isLoading = true;

  constructor() {

this.clientesService.getClientes().subscribe({
    next: (clientes) => {
      console.log('📦 Clientes recibidos:', clientes);
      this.dataSource.data = clientes as Cliente[];
      this.isLoading = false;
    },
    error: (err) => {
      console.error('❌ Error cargando clientes', err);
      this.isLoading = false;
    }
  });


  }

  crearCliente() {
    const dialogRef = this.dialog.open(ClienteForm, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientesService.createCliente(result).subscribe({
          next: (nuevoCliente) => {
            console.log("Cliente creado", nuevoCliente);
            this.dataSource.data = [...this.dataSource.data, nuevoCliente];

          },
          error: (err) => console.error('Error creando cliente', err)
        });
      }
    });
  }
  editarCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteForm, {
      width: '600px',
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientesService.updateCliente(result.id, result);
      }
    });
  }
  eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el cliente ${cliente.nombre} con ID ${cliente.id}?`);
    if (confirmacion) {
      this.clientesService.deleteCliente(cliente.id);
    }
  }
}
