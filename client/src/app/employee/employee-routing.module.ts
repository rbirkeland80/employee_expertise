import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';

import { AuthGuard } from '../auth/auth-guard.service';

const employeeRoutes: Routes = [
    { path: 'about', component: EmployeeComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(employeeRoutes)
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
