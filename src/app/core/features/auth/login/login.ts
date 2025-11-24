import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/AngularMaterial/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form;
  errorMessage= '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      if (email === 'Debora' && password === '123456') {
        console.log('Ingreso exitoso');
        this.router.navigateByUrl('/clientes');

      // Feedback opcional


      } else {
        alert(this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
