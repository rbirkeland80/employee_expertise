import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as ProfilesActions from './profiles.actions';
import { Profile } from '../../models/profile.model';
import { ApiRequest } from '../../constants/request.constant';

@Injectable()
export class ProfilesEffects {
    private apiBaseUrl = new ApiRequest().base;

    constructor(private actions$: Actions, private http: HttpClient) { }

    @Effect()
    getProfile = this.actions$
        .ofType(ProfilesActions.TRY_GET_PROFILE)
        .map((action: ProfilesActions.TryGetProfile) => {
            return action.payload;
        })
        .switchMap((profileId: string) => {
            return this.http.get<Profile>(`${this.apiBaseUrl}profiles/${profileId}`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .map((profile: Profile) => {
            console.log(profile);

            return {
                type: ProfilesActions.SET_PROFILE,
                payload: profile
            };
        });

    @Effect()
    getProfiles = this.actions$
        .ofType(ProfilesActions.TRY_GET_PROFILES)
        .switchMap(() => {
            return this.http.get<[Profile]>(`${this.apiBaseUrl}profiles`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .map((profiles: Profile[]) => {
            console.log(profiles);

            return {
                type: ProfilesActions.SET_PROFILES,
                payload: profiles
            };
        });
}
