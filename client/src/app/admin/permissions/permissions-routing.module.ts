import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsComponent } from './permissions.component';

const PermissionsRoutes: Routes = [
    { path: '', component: PermissionsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(PermissionsRoutes)
    ],
    exports: [RouterModule]
})
export class PermissionsRoutingModule { }
