import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordDialogComponent } from './recover-password-dialog/recover-password-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordDialogComponent
  ]
})
export class AuthModule { }
