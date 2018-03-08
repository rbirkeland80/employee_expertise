import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { KnowledgeBaseEditComponent } from './knowledge-base-edit/knowledge-base-edit.component';

import { AuthGuard } from '../auth/auth-guard.service';

const employeeRoutes: Routes = [
    { path: 'employees/:un', component: EmployeeComponent, canActivate: [AuthGuard], children: [
        { path: '', component: KnowledgeBaseComponent },
        { path: 'edit', component: KnowledgeBaseEditComponent }
    ] },
];

@NgModule({
    imports: [
        RouterModule.forChild(employeeRoutes)
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
