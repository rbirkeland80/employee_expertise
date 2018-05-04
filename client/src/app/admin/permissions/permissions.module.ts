import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsEffects } from '../../shared/store/permissions/permissions.effects';

import { PermissionsComponent } from './permissions.component';

@NgModule({
    imports: [
        SharedModule,
        PermissionsRoutingModule,
        EffectsModule.forFeature([PermissionsEffects])
    ],
    declarations: [
        PermissionsComponent
    ]
})
export class PermissionsModule { }
