import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/AngularMaterial/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationService } from '../../../services/navigation.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {


  form = inject(FormBuilder).group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  private navigationService = inject(NavigationService);

  errorMessage = '';
  isNavigating = false

  onLogin() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const email = this.form.value.email!;
    const password = this.form.value.password!;

    const loginOk = this.authService.login(email, password);

    if (loginOk) {
      this.isNavigating = true;
      this.navigationService.navigateWithDelay('/clientes', 2000);


      this.router.navigate(['/clientes'], { replaceUrl: true });
    } else {
      this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
      alert
    }
    // form;
    // errorMessage= '';
    // isNavigating = false;

    // constructor(private fb: FormBuilder, private navigationService: NavigationService) {
    //   this.form = this.fb.group({
    //     email: ['', [Validators.required]],
    //     password: ['', [Validators.required]]
    //   });
    // }

    // onLogin() {
    //   if (this.form.valid) {
    //     const email = this.form.get('email')?.value;
    //     const password = this.form.get('password')?.value;
    //     if (email === 'Debora' && password === '123456') {
    //       console.log('Ingreso exitoso');
    //       this.isNavigating = true;
    //       this.navigationService.navigateWithDelay('/clientes', 2000);
    //     } else {
    //       alert(this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.');
    //     }
    //   } else {
    //     this.form.markAllAsTouched();
    //   }
    // }
  }
}
