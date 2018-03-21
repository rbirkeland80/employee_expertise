import { Action } from '@ngrx/store';

import { Employee } from '../employee.model';

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const TRY_GET_EMPLOYEE = 'TRY_GET_EMPLOYEE';

export class SetEmployee implements Action {
    readonly type = SET_EMPLOYEE;

    constructor(public payload: Employee) { }
}

export class TryGetEmployee implements Action {
    readonly type = TRY_GET_EMPLOYEE;

    constructor(public payload: string) {}
}

export type EmployeesActions = SetEmployee | TryGetEmployee;
