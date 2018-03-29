import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Employee } from './employee.model';
import * as fromEmployees from './store/employees.reducers';
import * as EmployeesActions from './store/employees.actions';

@Component({
    selector: 'ee-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    employee: Employee;
    private employeeState: Observable<{ employee: Employee }>;

    constructor(private store: Store<fromEmployees.EmployeesState>) { }

    ngOnInit() {
        const id = localStorage.getItem('userId');
        this.store.dispatch(new EmployeesActions.TryGetEmployee(id));
        this.employeeState = this.store.select('employee');
        this.employeeState
            .subscribe(
                (state: { employee: Employee }) => {
                    if (state && state.employee) {
                        this.employee = state.employee;
                    }
                }
            );
    }
}
