import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AvatarRequest } from '../shared/constants/request.constant';
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
    avatarImagePath: string;
    private employeeState: Observable<{ employee: Employee }>;
    private avatarBaseUrl = new AvatarRequest().base;

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
                        this.avatarImagePath = `${this.avatarBaseUrl}${state.employee.username}.png`;
                    }
                }
            );
    }
}
