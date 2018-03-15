import { NgModule } from '@angular/core';

import { SupportRoutingModule } from './support-routing.module';

import { SupportComponent } from './support.component';

@NgModule({
    declarations: [
        SupportComponent
    ],
    imports: [
        SupportRoutingModule
    ]
})
export class SupportModule { }
