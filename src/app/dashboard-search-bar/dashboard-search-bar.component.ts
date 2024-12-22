import { Component, model } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-search-bar',
  imports: [MatFormField, MatInput, FormsModule],
  template: `
    <mat-form-field appearance="outline">
      <input
        matInput
        placeholder="Name"
        name="name"
        [(ngModel)]="nameToFilter"
      />
    </mat-form-field>

    <mat-form-field appearance="outline">
      <input
        matInput
        placeholder="Department"
        name="department"
        [(ngModel)]="departmentToFilter"
      />
    </mat-form-field>
  `,
  styleUrl: './dashboard-search-bar.component.scss',
})
export class DashboardSearchBarComponent {
  readonly nameToFilter = model('');
  readonly departmentToFilter = model('');
}
