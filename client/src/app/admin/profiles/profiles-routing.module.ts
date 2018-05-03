import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesComponent } from './profiles.component';

const ProfilesRoutes: Routes = [
    { path: '', component: ProfilesComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ProfilesRoutes)
    ],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }
