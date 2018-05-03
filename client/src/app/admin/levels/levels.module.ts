import { NgModule } from '@angular/core';

import { LevelsRoutingModule } from './levels-routing.module';

import { LevelsComponent } from './levels.component';

@NgModule({
    imports: [
        LevelsRoutingModule
    ],
    declarations: [
        LevelsComponent
    ]
})
export class LevelsModule { }
