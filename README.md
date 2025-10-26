# Debora Sanabria Hair — Frontend (Angular)

Este repositorio contiene la aplicación frontend construida con Angular 20 y Angular Material.

## Resumen

- Versión de Angular detectada: 20.x (paquetes en `package.json` apuntan a ^20.3.x)
- Angular Material: ^20.2.8
- Angular CDK: ^20.2.8

Los valores anteriores fueron leídos desde `package.json`.

## Módulos de Angular Material instalados

El proyecto exporta un módulo centralizado de Material en `src/app/core/shared/AngularMaterial/material.module.ts`. Los módulos de Material incluidos son:

- MatButtonModule
- MatToolbarModule
- MatIconModule
- MatCardModule
- MatInputModule
- MatFormFieldModule
- MatSidenavModule
- MatListModule
- MatMenuModule
- MatDialogModule
- MatSnackBarModule
- MatProgressSpinnerModule

Estos módulos provienen de `@angular/material` (versión indicada más arriba).

## Componentes y módulos que usan Angular Material

En este proyecto hay varios componentes que consumen módulos de Angular Material. Los detectados automáticamente en `src/app` incluyen (ruta relativa a `src/app`):

- `core/shared/components/table` — `Table` (componente reutilizable para tablas)
- `core/shared/components/dialog` — `Dialog` (componente genérico para diálogos)
- `core/layouts/dashboard` — `Dashboard` (layout principal)
- `core/layouts/auth-layout` — `AuthLayout` (layout para autenticación)
- `core/features/auth/login` — `Login` (usa `MaterialModule`, `FormsModule`, `ReactiveFormsModule`)
- `core/features/auth/register` — `Register`
- `core/features/clientes/pages/cliente-table` — `ClienteTable` (usa: MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule)
- `core/features/clientes/components/cliente-form` — `ClienteForm` (usa: MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatIconModule)

Nota: Algunos componentes importan directamente módulos de Material (por ejemplo `MatDialogModule`, `MatFormFieldModule`) y otros consumen el `MaterialModule` central.

## Estructura relevante

- `src/app/core/shared/AngularMaterial/material.module.ts` — módulo que agrupa y exporta los módulos de Angular Material usados.
- `src/app/core/shared/components/` — componentes compartidos (dialog, table, etc.).
- `src/app/core/features/` — funcionalidades específicas (auth, clientes, home, etc.).
- `src/app/core/layouts/` — layouts (dashboard, auth-layout).

## Comandos útiles

Instalar dependencias:

```powershell
npm install
```

Levantar la aplicación en modo desarrollo:

```powershell
npm start
```

Ejecutar tests (si están configurados):

```powershell
npm test
```

## Buenas prácticas y notas

- Mantén las versiones de `@angular/material` y `@angular/cdk` alineadas con la versión principal de Angular; en este proyecto ambas están en la serie 20.x.
- El `MaterialModule` centralizado facilita importar Material en componentes; sin embargo, para optimizar tamaño de bundle en aplicaciones grandes, considera importar sólo los módulos necesarios a nivel de componente o de feature module.
- Revisa `tsconfig` y `angular.json` si necesitas cambiar la configuración de compilación o estilos globales.

## Siguientes pasos recomendados (opcionales)

- Añadir pequeñas secciones de documentación por componente (propósito, inputs/outputs) dentro de `README.md` o como comentarios en los archivos.
- Añadir instrucciones para producción (build & deploy) si deseas un despliegue continuo.

---

Si quieres que extienda el README con ejemplos de uso de los componentes Material (ej.: ejemplo de `ClienteForm` o `Dialog`), o que añada comandos de build/producción y deploy, dímelo y lo agrego.
# DeboraSanabriaHair

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



//Ahora elproblema es el post queno quiere hacer.

