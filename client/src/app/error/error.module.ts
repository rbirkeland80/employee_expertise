import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [ErrorComponent]
})
export class ErrorModule { }
