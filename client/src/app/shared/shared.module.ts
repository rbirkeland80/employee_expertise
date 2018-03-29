import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ImgFallbackDirective } from './directives/img-fallback.directive';
import { DropDownDirective } from './directives/drop-down.directive';

@NgModule({
    imports: [
        MatDialogModule
    ],
    declarations: [
        ImgFallbackDirective,
        DropDownDirective
    ],
    exports: [
        CommonModule,
        MatDialogModule,
        ImgFallbackDirective,
        DropDownDirective
    ]
})
export class SharedModule { }
