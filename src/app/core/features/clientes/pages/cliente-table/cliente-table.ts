
import { CommonModule } from '@angular/common';
import {Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/AngularMaterial/material.module';
import { ClientesService } from '../../../../services/clientes.service';
import { NavigationService } from '../../../../services/navigation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../../models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteForm } from '../../components/cliente-form/cliente-form';
import { AuthService } from '../../../../services/auth.service';
import { finalize } from 'rxjs';



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

  displayedColumns: string[] = ['id', 'nombre', 'tecnica', 'tipo', 'cantidad', 'precioUnitario', 'precioTotal', 'tipoPago', 'direccion', 'celular', 'descripcion', 'fecha', 'image', 'acciones'];

  isLoading= signal(true);
  isNavigating= signal(false);

  private clientesService =   inject(ClientesService);
  private navigationService = inject(NavigationService);
  private dialog =            inject(MatDialog);

  dataSource = new MatTableDataSource<Cliente>([]);
  private authService = inject(AuthService);



  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.isLoading.set(true);
    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        console.log('📦 Clientes recibidos:', clientes);
        this.dataSource.data = clientes;
        this.isLoading.set(false)

      },
      error: (err) => {
        console.error('❌ Error cargando clientes', err);
        this.isLoading.set(false);

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
        this.isNavigating.set(true);

        this.clientesService.createCliente(result).subscribe({
          next: (nuevoCliente) => {
            console.log("Cliente creado", nuevoCliente);
            this.dataSource.data = [...this.dataSource.data, nuevoCliente];
            setTimeout(() => {
              this.isNavigating.set(false)
              }, 1500);
          },
          error: (err) => {
            console.error('❌ Error creando cliente', err);
            console.log('🔍 Error completo del backend:', err.error);
            console.log('📝 Mensaje específico:', err.error.message);
            console.log('📊 Status:', err.status);
            this.isNavigating.set(false)
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
        this.isNavigating.set(true)
        const payloadFinal = { ...result };

        this.clientesService.updateCliente(payloadFinal.id, payloadFinal).pipe(
          finalize(() =>{
            this.isNavigating.set(false);
          })
        )
        .subscribe({
          next: (clienteActualizado) => {
            console.log("Cliente actualizado", clienteActualizado);
            const index = this.dataSource.data.findIndex(c => c.id === clienteActualizado.id);
            if (index !== -1) {
              this.dataSource.data[index] = clienteActualizado;
              this.dataSource._updateChangeSubscription();
            }
            setTimeout(() => {
              this.isNavigating.set(false);

            }, 1500);
          },
          error: (err) => {
            console.error('Error actualizando cliente', err);
            console.log('Payload enviado: ', result);
            console.log('Error completo: ', err.error);
            this.isNavigating.set(false);
          }
        });
      }
    });
  }
  eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el cliente ${cliente.nombre} con ID ${cliente.id}?`);
    if (confirmacion) {
      this.isNavigating.set(true);
      this.clientesService.deleteCliente(cliente.id).subscribe({
        next: () => {
          const deleteConfirmation = `Cliente ${cliente.nombre} eliminado exitosamente.`;
          console.log(deleteConfirmation);
          alert(deleteConfirmation);
          this.dataSource.data = this.dataSource.data.filter(c => c.id !== cliente.id);
          setTimeout(() => {
            this.isNavigating.set(false);

          }, 1500);
        },
        error: (err) => {
          console.error('Error eliminando cliente', err);
          this.isNavigating.set(false);
        }
      });
    }
  }



  logout() {
    // Mostrar overlay de carga
    this.isNavigating.set(true);


    // Ejecutar lógica de logout (limpiar token/session)
    try {
      this.authService.logout();
    } catch (err) {
      console.warn('Error en authService.logout():', err);
    }

    // Navegar al login con delay para mostrar el spinner
    this.navigationService.navigateWithDelay('/login', 1500);
  }
}
