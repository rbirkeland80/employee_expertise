import { NgModule } from '@angular/core';

import { ProfilesRoutingModule } from './profiles-routing.module';

import { ProfilesComponent } from './profiles.component';

@NgModule({
    imports: [
        ProfilesRoutingModule
    ],
    declarations: [
        ProfilesComponent
    ]
})
export class ProfilesModule { }
