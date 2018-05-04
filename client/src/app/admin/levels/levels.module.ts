import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { LevelsRoutingModule } from './levels-routing.module';
import { LevelsEffects } from '../../shared/store/levels/levels.effects';

import { LevelsComponent } from './levels.component';

@NgModule({
    imports: [
        SharedModule,
        LevelsRoutingModule,
        EffectsModule.forFeature([LevelsEffects])
    ],
    declarations: [
        LevelsComponent
    ]
})
export class LevelsModule { }
