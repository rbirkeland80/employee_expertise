import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';

const AdminRoutes: Routes = [
    { path: '', component: AdminComponent, children:
        [
            { path: 'employees', component: EmployeesComponent },
            { path: 'levels', loadChildren: 'app/admin/levels/levels.module#LevelsModule' },
            { path: 'profiles', loadChildren: 'app/admin/profiles/profiles.module#ProfilesModule' },
            { path: 'expertise', loadChildren: 'app/admin/expertise/expertise.module#ExpertiseModule' },
            { path: 'permissions', loadChildren: 'app/admin/permissions/permissions.module#PermissionsModule' },
            { path: '', redirectTo: '/admin/employees', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
