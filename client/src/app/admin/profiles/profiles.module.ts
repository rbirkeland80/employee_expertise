import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesEffects } from '../../shared/store/profiles/profiles.effects';

import { ProfilesComponent } from './profiles.component';

@NgModule({
    imports: [
        SharedModule,
        ProfilesRoutingModule,
        EffectsModule.forFeature([ProfilesEffects])
    ],
    declarations: [
        ProfilesComponent
    ]
})
export class ProfilesModule { }
