
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/AngularMaterial/material.module';
import { ClientesService } from '../../../../services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../../models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteForm } from '../../components/cliente-form/cliente-form';



@Component({
  selector: 'app-cliente-table',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './cliente-table.html',
  styleUrls: ['./cliente-table.scss']
})
export class ClienteTable implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'tecnica', 'tipo', 'cantidad', 'precioUnitario', 'precioTotal', 'direccion', 'celular', 'descripcion', 'fecha', 'image', 'acciones'];

  isLoading: boolean = true;

  private clientesService = inject(ClientesService);
  private dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Cliente>([]);


  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.isLoading = true;
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        console.log('📦 Clientes recibidos:', clientes);
        this.dataSource.data = clientes;
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
        this.clientesService.updateCliente(result.id, result).subscribe({
          next: (clienteActualizado) => {
            console.log("Cliente actualizado", clienteActualizado);
            const index = this.dataSource.data.findIndex(c => c.id === clienteActualizado.id);
            if (index !== -1) {
              this.dataSource.data[index] = clienteActualizado;
              this.dataSource._updateChangeSubscription(); // Notificar al dataSource del cambio
            }
          },
          error: (err) => console.error('Error actualizando cliente', err)
        });
      }
    });
  }
  eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el cliente ${cliente.nombre} con ID ${cliente.id}?`);
    if (confirmacion) {
      this.clientesService.deleteCliente(cliente.id).subscribe({
        next: () => {
          console.log("Cliente elmiminado");
          this.dataSource.data = this.dataSource.data.filter(c => c.id !== cliente.id);
        },
        error: (err) => console.error('Error eliminando cliente', err)

      });
    }
  }
}
