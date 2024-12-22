import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee, OffboardRequestBody } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  private readonly http = inject(HttpClient);

  getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:4200/api/employees');
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:4200/api/employees/${id}`);
  }

  offboard(body: OffboardRequestBody, employeeId: string): Observable<void> {
    return this.http.post<void>(
      `http://localhost:4200/api/employees/${employeeId}/offboard`,
      body,
    );
  }
}
