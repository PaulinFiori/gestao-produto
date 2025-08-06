import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  isLoading = false;
  isValidatingToken = true;
  tokenValid = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    
    if (!this.token) {
      this.snackBar.open('Token de recuperação não encontrado', 'Fechar', { duration: 4000 });
      this.router.navigate(['/login']);
      return;
    }

    this.validateToken();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  validateToken(): void {
    this.isValidatingToken = true;
    
    this.authService.validateResetToken(this.token).subscribe({
      next: (response: any) => {
        this.tokenValid = response.valid;
        this.isValidatingToken = false;
        
        if (!this.tokenValid) {
          this.snackBar.open('Token inválido ou expirado', 'Fechar', { duration: 4000 });
        }
      },
      error: (error) => {
        this.tokenValid = false;
        this.isValidatingToken = false;
        this.snackBar.open('Erro ao validar token', 'Fechar', { duration: 4000 });
      }
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.tokenValid) {
      this.isLoading = true;
      const newPassword = this.resetForm.get('newPassword')?.value;

      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.snackBar.open('Senha redefinida com sucesso!', 'Fechar', { duration: 4000 });
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open(response.message || 'Erro ao redefinir senha', 'Fechar', { duration: 4000 });
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMessage = error.error?.message || 'Erro ao redefinir senha';
          this.snackBar.open(errorMessage, 'Fechar', { duration: 4000 });
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.resetForm.get('newPassword');
    if (passwordControl?.hasError('required')) {
      return 'Nova senha é obrigatória';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Nova senha deve ter pelo menos 6 caracteres';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.resetForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Confirmação de senha é obrigatória';
    }
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      return 'Senhas não coincidem';
    }
    return '';
  }
}
