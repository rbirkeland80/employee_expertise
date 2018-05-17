import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichTableComponent } from './rich-table.component';
import { RichTableGenericPipe } from './richTableGenericPipe.pipe';
import { RichTableColumnBuilderService } from './rich-tableBaseColumnBuilder.service';

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
    ],
    providers: [ RichTableColumnBuilderService ]
})
export class RichTableModule { }
