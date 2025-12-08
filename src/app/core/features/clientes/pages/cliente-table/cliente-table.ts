
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/AngularMaterial/material.module';
import { ClientesService } from '../../../../services/clientes.service';
import { NavigationService } from '../../../../services/navigation.service';
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
  isNavigating: boolean = false;

  private clientesService = inject(ClientesService);
  private navigationService = inject(NavigationService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error cargando clientes', err);
        this.isLoading = false;
        this.cdr.detectChanges();
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
        console.log('Enviando al backend', result);
        this.isNavigating = true;

        this.clientesService.createCliente(result).subscribe({
          next: (nuevoCliente) => {
            console.log("Cliente creado", nuevoCliente);
            this.dataSource.data = [...this.dataSource.data, nuevoCliente];
            setTimeout(() => {
              this.isNavigating = false;
              this.cdr.detectChanges();
            }, 1500);
          },
          error: (err) => {
            console.error('❌ Error creando cliente', err);
            console.log('🔍 Error completo del backend:', err.error);
            console.log('📝 Mensaje específico:', err.error.message);
            console.log('📊 Status:', err.status);
            this.isNavigating = false;
          }
        });
      }
    });
  }


  editarCliente(cliente: Cliente) {

    const clienteParaEditar = { ...cliente };

    if (clienteParaEditar.fecha && typeof clienteParaEditar.fecha === 'string') {
        clienteParaEditar.fecha = new Date(clienteParaEditar.fecha) as any;
    }
    const dialogRef = this.dialog.open(ClienteForm, {
      width: '600px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Actualizando en el backend', result);
        this.isNavigating = true;
        const payloadFinal = { ...result };

        this.clientesService.updateCliente(payloadFinal.id, payloadFinal).subscribe({
          next: (clienteActualizado) => {
            console.log("Cliente actualizado", clienteActualizado);
            const index = this.dataSource.data.findIndex(c => c.id === clienteActualizado.id);
            if (index !== -1) {
              this.dataSource.data[index] = clienteActualizado;
              this.dataSource._updateChangeSubscription();
            }
            setTimeout(() => {
              this.isNavigating = false;
              this.cdr.detectChanges();
            }, 1500);
          },
          error: (err) => {
            console.error('Error actualizando cliente', err);
            console.log('Payload enviado: ', result);
            console.log('Error completo: ', err.error);
            this.isNavigating = false;
          }
        });
      }
    });
  }
  eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el cliente ${cliente.nombre} con ID ${cliente.id}?`);
    if (confirmacion) {
      this.isNavigating = true;
      this.clientesService.deleteCliente(cliente.id).subscribe({
        next: () => {
          const deleteConfirmation = `Cliente ${cliente.nombre} eliminado exitosamente.`;
          console.log(deleteConfirmation);
          alert(deleteConfirmation);
          this.dataSource.data = this.dataSource.data.filter(c => c.id !== cliente.id);
          setTimeout(() => {
            this.isNavigating = false;
            this.cdr.detectChanges();
          }, 1500);
        },
        error: (err) => {
          console.error('Error eliminando cliente', err);
          this.isNavigating = false;
        }
      });
    }
  }
}
