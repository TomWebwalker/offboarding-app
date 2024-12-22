import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { OffboardModalService } from './offboard-modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { createOffboardModalForm } from './offboard-modal-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../types';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-offboard-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './offboard-modal.component.html',
  styleUrl: './offboard-modal.component.scss',
  providers: [OffboardModalService],
})
export class OffboardModalComponent {
  private readonly dialogData = inject<{ employee: Employee }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<boolean>);
  private readonly offboardModalService = inject(OffboardModalService);
  readonly form = createOffboardModalForm();

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.offboardModalService
      .offboardEmployee(this.form.getRawValue(), this.dialogData.employee.id)
      .pipe(take(1), filter(Boolean))
      .subscribe(() => this.dialogRef.close(true));
  }
}
