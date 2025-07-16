import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordDialogComponent } from '../recover-password-dialog/recover-password-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  isLoadingRecover = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  recoverPassword() {
    const dialogRef = this.dialog.open(RecoverPasswordDialogComponent, {
      width: '480px'
    });
    dialogRef.afterClosed().subscribe((email: string) => {
      if (email) {
        this.isLoadingRecover = true;
        const { email } = this.loginForm.value;

        this.authService.recoverPassword(email).subscribe({
          next: () => {
            this.snackBar.open('Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.', 'Fechar', { duration: 4000 });
            this.isLoadingRecover = false;
          },
          error: () => {
            this.snackBar.open('Erro ao enviar o email, tente novamente.', 'Fechar', { duration: 4000 });
            this.isLoadingRecover = false;
          },
          complete: () => {
            this.isLoadingRecover = false;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao fazer login. Verifique suas credenciais.', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/cadastre']);
  }

} 