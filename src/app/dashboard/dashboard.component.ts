import { Component, inject } from '@angular/core';
import { DashboardSearchBarComponent } from '../dashboard-search-bar/dashboard-search-bar.component';
import { EmployeesTableComponent } from '../employees-table/employees-table.component';
import { EmployeesService } from './employees.service';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardSearchBarComponent,
    EmployeesTableComponent,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [EmployeesService],
})
export default class DashboardComponent {
  private readonly employeesService = inject(EmployeesService);
  readonly employees = this.employeesService.employees;
  readonly nameToFilter = this.employeesService.nameToFilter;
  readonly departmentToFilter = this.employeesService.departmentToFilter;
}
