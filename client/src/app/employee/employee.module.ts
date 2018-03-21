import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeComponent } from './employee.component';

import { employeesReducer } from './store/employees.reducers';
import { EmployeesEffects } from './store/employees.effects';

@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        StoreModule.forFeature('employee', employeesReducer),
        EffectsModule.forFeature([EmployeesEffects])
    ]
})
export class EmployeeModule { }
