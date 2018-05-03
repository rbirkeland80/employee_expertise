import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
    declarations: [
        AdminComponent,
        EmployeesComponent
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        MatSidenavModule
    ]
})
export class AdminModule { }
