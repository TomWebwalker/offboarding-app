import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { EmployeeDetailsService } from './employee-details.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OffboardModalComponent } from '../offboard-modal/offboard-modal.component';
import { filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  imports: [
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    MatFormFieldModule,
    MatInputModule,
    MatChipSet,
    MatChip,
    MatButton,
    RouterLink,
    MatAnchor,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [EmployeeDetailsService],
})
export default class EmployeeDetailsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  readonly employee = inject(EmployeeDetailsService).employee;
  readonly isLoading = inject(EmployeeDetailsService).isLoading;
  readonly error = inject(EmployeeDetailsService).error;

  handleShowOffBoardModal(): void {
    const dialogRef = this.dialog.open(OffboardModalComponent, {
      data: { employee: this.employee() },
      width: '600px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.snackBar.open('Employee offboarded', '', { duration: 3000 });
        this.router.navigate(['/']);
      });
  }
}
