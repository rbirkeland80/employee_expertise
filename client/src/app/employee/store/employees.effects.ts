import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as EmployeeActions from './employees.actions';
import { Employee } from '../employee.model';
import { ApiRequest } from '../../shared/constants/request.constant';

@Injectable()
export class EmployeesEffects {
    private apiBaseUrl = new ApiRequest().base;

    constructor(private actions$: Actions, private http: HttpClient) { }

    @Effect()
    getEmployee = this.actions$
        .ofType(EmployeeActions.TRY_GET_EMPLOYEE)
        .map((action: EmployeeActions.TryGetEmployee) => {
            return action.payload;
        })
        .switchMap((employeeId: string) => {
            return this.http.get<Employee>(`${this.apiBaseUrl}employees/${employeeId}`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .map((employee: Employee) => {
            console.log(employee);

            return {
                type: EmployeeActions.SET_EMPLOYEE,
                payload: employee
            };
        });
}
