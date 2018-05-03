import { NgModule } from '@angular/core';

import { ExpertiseRoutingModule } from './expertise-routing.module';

import { ExpertiseComponent } from './expertise.component';

@NgModule({
    imports: [
        ExpertiseRoutingModule
    ],
    declarations: [
        ExpertiseComponent
    ]
})
export class ExpertiseModule { }
