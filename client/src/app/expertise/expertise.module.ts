import { NgModule } from '@angular/core';

import { ExpertiseRoutingModule } from './expertise-routing.module';

import { ExpertiseComponent } from './expertise.component';

@NgModule({
    declarations: [
        ExpertiseComponent
    ],
    imports: [
        ExpertiseRoutingModule
    ]
})
export class ExpertiseModule { }
