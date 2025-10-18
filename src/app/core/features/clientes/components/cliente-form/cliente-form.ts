import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../shared/AngularMaterial/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../../../models/cliente.model';


@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MaterialModule, ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss'
})
export class ClienteForm {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClienteForm>);
  private data = inject(MAT_DIALOG_DATA) as Partial<Cliente>;

  precioTecnica: Record<string, number[]> = {
    nanoring: [1800],
    microring: [1500],
    cosida: [3000],
    'pega directa': [10000]
  };

  tecnicaSeleccionada = signal(this.data.tecnica || 'nanoring');

  form: FormGroup = this.fb.group({
    id: [this.data.id ?? null],
    nombre: [this.data.nombre || '', Validators.required],
    tecnica: [this.data.tecnica || 'nanoring', Validators.required],
    tipo: [this.data.tipo || 'punto', Validators.required],
    cantidad: [this.data.cantidad || 0, [Validators.required, Validators.min(1)]],
    precioUnitario: [this.data.precioUnitario || 0, [Validators.required, Validators.min(0)]],
    precioTotal: [{ value: this.data.precioTotal || 0, disabled: true }],
    direccion: [this.data.direccion || '', Validators.required],
    cel: [this.data.cel || '', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
    descripcion: [this.data.descripcion || '', Validators.required],
    fecha: [this.data.fecha || '', Validators.required],
    image: [this.data.image || '', Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)$/)],
  })


nombre= signal(this.form.get('cantidad')?.value)
titulo = computed(() => this.form.value.id ? 'Editar Cliente' : 'Nuevo Cliente');
preciosDisponibles = computed(() => this.precioTecnica[this.tecnicaSeleccionada()] ?? []);

  // ngOnInit(): void {
  //   this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularTotal());
  //   this.form.get('precioUnitario')?.valueChanges.subscribe(() => this.calcularTotal());
  // }
constructor() {
  this.form.get('tecnica')?.valueChanges.subscribe((tecnica) => {
    this.tecnicaSeleccionada.set(tecnica);

    const precios = this.precioTecnica[tecnica];
    const precioUnitario = precios ? precios[0] : 0;
    //Cuando hay cambio de técnica, hay cambio de la sinal
    this.form.patchValue({ precioUnitario });
    this.calcularTotal();
  });

//Recalcular total cuando cambian el precio unitario o la cantidad
  this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularTotal());
  this.form.get('precioUnitario')?.valueChanges.subscribe(() => this.calcularTotal());
}

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  cancelar() {
    this.dialogRef.close();
  }

  calcularTotal() {
    const cantidad = this.form.get('cantidad')?.value || 0;
    const precioUnitario = this.form.get('precioUnitario')?.value || 0;
    this.form.patchValue({ precioTotal: cantidad * precioUnitario }, { emitEvent: false });
  }

}
