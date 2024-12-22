import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeesApiService } from '../api/employees-api.service';

@Injectable()
export class EmployeesService {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeesList = toSignal(
    this.employeesApiService.getList(),
    {
      initialValue: [],
    },
  );
  readonly employees = computed(() => {
    const employees = this.employeesList();
    return employees.filter(
      (employee) =>
        employee.name
          .toLowerCase()
          .includes(this.nameToFilter().toLowerCase()) &&
        employee.department
          .toLowerCase()
          .includes(this.departmentToFilter().toLowerCase()),
    );
  });
  readonly nameToFilter = signal('');
  readonly departmentToFilter = signal('');
}
