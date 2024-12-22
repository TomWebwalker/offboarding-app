import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Employee, UiColumn } from '../types';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

const COLUMNS: UiColumn<Employee>[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'equipments',
    header: 'Equipments',
    cell: (row) => row.equipments.map(({ name }) => name).join(', '),
  },
  {
    key: 'status',
    header: 'Status',
  },
];

@Component({
  selector: 'app-employees-table',
  imports: [MatTableModule, MatAnchor, RouterLink],
  templateUrl: './employees-table.component.html',
})
export class EmployeesTableComponent {
  readonly columns = [...COLUMNS];
  readonly displayedColumns = [...COLUMNS.map(({ key }) => key), 'actions'];
  readonly employees = input.required<Employee[]>();
}
