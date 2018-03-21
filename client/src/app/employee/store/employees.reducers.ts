import * as EmployeesActions from './employees.actions';
import * as fromApp from '../../store/app.reducers';
import { Employee } from '../employee.model';

export interface EmployeesState extends fromApp.AppState {
    employee: State;
}

export interface State {
    employee: Employee;
}

const initialState: State = {
    employee: null
};

export function employeesReducer(state = initialState, action: EmployeesActions.EmployeesActions) {
    switch (action.type) {
        case EmployeesActions.SET_EMPLOYEE:
            return {
                ...state,
                employee: action.payload
            };

        default:
            return state;
    }
}
