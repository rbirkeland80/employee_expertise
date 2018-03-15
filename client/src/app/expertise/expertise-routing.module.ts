import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpertiseComponent } from './expertise.component';

const ExpertiseRoutes: Routes = [
    { path: '', component: ExpertiseComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ExpertiseRoutes)
    ],
    exports: [RouterModule]
})
export class ExpertiseRoutingModule { }
