import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';

import { EmployeeComponent } from './employee.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { KnowledgeBaseEditComponent } from './knowledge-base-edit/knowledge-base-edit.component';

@NgModule({
    declarations: [
        EmployeeComponent,
        KnowledgeBaseComponent,
        KnowledgeBaseEditComponent
    ],
    imports: [
        EmployeeRoutingModule
    ]
})
export class EmployeeModule { }
