import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Profile } from '../../shared/models/profile.model';
import * as ProfilesActions from '../../shared/store/profiles/profiles.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'ee-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
    profiles: Profile[];
    private profilesState: Observable<{ profiles: Profile[] }>;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.store.dispatch(new ProfilesActions.TryGetProfiles);
        this.profilesState = this.store.select('profiles');
        this.profilesState
            .subscribe(
                (state: { profiles: Profile[] }) => {
                    if (state && state.profiles) {
                        this.profiles = state.profiles;
                    }
                }
            );
    }
}
