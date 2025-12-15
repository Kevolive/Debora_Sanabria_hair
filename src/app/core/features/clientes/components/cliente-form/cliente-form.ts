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
    MaterialModule,],
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
    celular: [this.data.celular || '', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
    descripcion: [this.data.descripcion || '', Validators.required],
    fecha: [this.data.fecha || '', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    imagen: [this.data.imagen || '', Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|gif)$/)],
    tipoPago: [this.data.tipoPago || null]
  })


  nombre = signal(this.form.get('cantidad')?.value)
  titulo = computed(() => this.form.value.id ? 'Editar Cliente' : 'Nuevo Cliente');
  preciosDisponibles = computed(() => this.precioTecnica[this.tecnicaSeleccionada()] ?? []);


  constructor() {
    this.form.get('tecnica')?.valueChanges.subscribe((tecnica) => {
      this.tecnicaSeleccionada.set(tecnica);


      this.calcularTotal();
    });

    //Recalcular total cuando cambian el precio unitario o la cantidad
    this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularTotal());
    this.form.get('precioUnitario')?.valueChanges.subscribe(() => this.calcularTotal());
  }

  guardar() {
    if (this.form.valid) {

      this.calcularTotal();
      const rawData = this.form.getRawValue();

      let fechaISO: string;
      if (rawData.fecha && rawData.fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = rawData.fecha.split('-');
      const fechaDate = new Date(Number(year), Number(month) - 1, Number(day));
      fechaISO = fechaDate.toISOString(); // "2025-11-02T05:00:00.000Z"
    } else {
      fechaISO = new Date().toISOString();
    }


      const formData = {
        id: rawData.id,
        nombre: rawData.nombre,
        tecnica: rawData.tecnica,
        tipo: rawData.tipo === 'gramos' ? 'gramo' : rawData.tipo,
        cantidad: Number(rawData.cantidad),
        precioUnitario: Number(rawData.precioUnitario),
        precioTotal: Number(rawData.precioTotal),
        direccion: rawData.direccion,
        celular: rawData.celular,
        descripcion: rawData.descripcion,
        fecha: fechaISO,
        imagen: rawData.imagen || null,
        tipoPago: rawData.tipoPago || null

      };

      if (rawData.id === null) {
        delete formData.id;
      }

      console.log('📤 Payload FINAL para backend:', formData);
      this.dialogRef.close(formData);
    }
  }
  cancelar() {
    this.dialogRef.close();
  }

  calcularTotal() {
    const cantidad = Number(this.form.get('cantidad')?.value) || 0
    const precioUnitario = Number(this.form.get('precioUnitario')?.value) || 0
    const precioTotal = cantidad * precioUnitario;
    this.form.patchValue({ precioTotal: precioTotal }, { emitEvent: false });

    console.log('Calculando total: ', { cantidad, precioUnitario, precioTotal });

  }

}
