import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password-dialog',
  templateUrl: './recover-password-dialog.component.html',
  styleUrls: ['./recover-password-dialog.component.scss']
})
export class RecoverPasswordDialogComponent {
  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RecoverPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.recoverForm.valid) {
      this.dialogRef.close(this.recoverForm.value.email);
    }
  }
}
