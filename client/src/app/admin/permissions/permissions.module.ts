import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { RichTableModule } from '../../rich-table/rich-table.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsEffects } from '../../shared/store/permissions/permissions.effects';

import { PermissionsComponent } from './permissions.component';
import { PermissionsRichTableHelperService } from './permissions-richTableHelper.service';
import { PermissionNameTransformPipe } from './permissionNameTransformPipe.pipe';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';

@NgModule({
    imports: [
        SharedModule,
        RichTableModule,
        PermissionsRoutingModule,
        EffectsModule.forFeature([PermissionsEffects])
    ],
    declarations: [
        PermissionsComponent,
        PermissionNameTransformPipe
    ],
    providers: [
        PermissionsRichTableHelperService,
        PermissionNameTransformPipe,
        StatusTransformPipe
    ]
})
export class PermissionsModule { }
