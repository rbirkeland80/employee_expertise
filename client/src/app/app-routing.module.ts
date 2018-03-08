import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: `/employees/${localStorage.getItem('username')}`, pathMatch: 'full' }
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
