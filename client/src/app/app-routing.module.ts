import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard] },
    { path: '**', redirectTo: `/employees/${localStorage.getItem('username')}` }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: true,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
