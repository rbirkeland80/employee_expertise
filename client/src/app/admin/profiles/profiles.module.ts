import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { RichTableModule } from '../../rich-table/rich-table.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesEffects } from '../../shared/store/profiles/profiles.effects';

import { ProfilesComponent } from './profiles.component';
import { ProfilesRichTableHelperService } from './profiles-richTableHelper.service';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';

@NgModule({
    imports: [
        SharedModule,
        RichTableModule,
        ProfilesRoutingModule,
        EffectsModule.forFeature([ProfilesEffects])
    ],
    declarations: [
        ProfilesComponent
    ],
    providers: [
        ProfilesRichTableHelperService,
        StatusTransformPipe
    ]
})
export class ProfilesModule { }
