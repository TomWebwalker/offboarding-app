import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  resource,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { EmployeesApiService } from '../api/employees-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EmployeeDetailsService {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly employeeId$ = inject(ActivatedRoute).params.pipe(
    map(({ id }) => id),
  );
  private readonly employeeId = toSignal<string>(this.employeeId$);
  private readonly employeeResource = resource({
    request: () => ({ id: this.employeeId() }),
    loader: ({ request }) =>
      lastValueFrom(
        this.employeesApiService
          .getById(request.id!)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      ),
  });

  readonly employee = computed(() => this.employeeResource.value());
  readonly isLoading = computed(() => this.employeeResource.isLoading());
  readonly error = computed(
    () =>
      (this.employeeResource.error() as HttpErrorResponse)?.error as {
        msg: string;
      },
  );
}
