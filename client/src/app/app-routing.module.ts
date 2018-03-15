import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: 'expertise', loadChildren: 'app/expertise/expertise.module#ExpertiseModule', canActivate: [AuthGuard] },
    { path: 'support', loadChildren: 'app/support/support.module#SupportModule', canActivate: [AuthGuard] },
    { path: '', redirectTo: '/about', pathMatch: 'full' }
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
