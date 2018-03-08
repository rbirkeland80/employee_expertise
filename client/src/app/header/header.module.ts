import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
