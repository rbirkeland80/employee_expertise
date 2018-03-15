import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';

const ErrorRoutes: Routes = [
    { path: '', component: ErrorComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ErrorRoutes)
    ],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }
