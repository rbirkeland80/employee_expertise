import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichTableComponent } from './rich-table.component';
import { RichTableGenericPipe } from './richTableGenericPipe.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RichTableComponent,
        RichTableGenericPipe
    ],
    exports: [
        RichTableComponent
    ]
})
export class RichTableModule { }
