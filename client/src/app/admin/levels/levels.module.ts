import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { RichTableModule } from '../../rich-table/rich-table.module';
import { LevelsRoutingModule } from './levels-routing.module';
import { LevelsEffects } from '../../shared/store/levels/levels.effects';

import { LevelsComponent } from './levels.component';
import { LevelsRichTableHelperService } from './levels-richTableHelper.service';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';

@NgModule({
    imports: [
        SharedModule,
        RichTableModule,
        LevelsRoutingModule,
        EffectsModule.forFeature([LevelsEffects])
    ],
    declarations: [
        LevelsComponent
    ],
    providers: [
        LevelsRichTableHelperService,
        StatusTransformPipe
    ]
})
export class LevelsModule { }
