import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelsComponent } from './levels.component';

const LevelsRoutes: Routes = [
    { path: '', component: LevelsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(LevelsRoutes)
    ],
    exports: [RouterModule]
})
export class LevelsRoutingModule { }
