import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeComponent } from './employee.component';

import { employeesReducer } from './store/employees.reducers';
import { EmployeesEffects } from './store/employees.effects';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@NgModule({
    declarations: [
        EmployeeComponent,
        BasicInfoComponent,
        AvatarComponent,
        ImageDialogComponent
    ],
    imports: [
        SharedModule,
        EmployeeRoutingModule,
        StoreModule.forFeature('employee', employeesReducer),
        EffectsModule.forFeature([EmployeesEffects])
    ],
    entryComponents: [
        ImageDialogComponent
    ],
})
export class EmployeeModule { }
