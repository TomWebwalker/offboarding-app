import { inject, Injectable, signal } from '@angular/core';
import { EmployeesApiService } from '../api/employees-api.service';
import { catchError, map, Observable, tap } from 'rxjs';
import { OffboardRequestBody } from '../types';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class OffboardModalService {
  private readonly employeesApiService = inject(EmployeesApiService);

  readonly isPending = signal(false);
  readonly error = signal('');

  offboardEmployee(
    body: OffboardRequestBody,
    employeeId: string,
  ): Observable<boolean> {
    this.isPending.set(true);
    return this.employeesApiService.offboard(body, employeeId).pipe(
      tap(() => this.isPending.set(false)),
      map(() => true),
      catchError((error: HttpErrorResponse) => {
        this.error.set(error.message);
        return [false];
      }),
    );
  }
}
