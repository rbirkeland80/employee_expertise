import { Action } from '@ngrx/store';

import { Profile } from '../../models/profile.model';

export const ADD_PROFILE = 'ADD_PROFILE';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILES = 'SET_PROFILES';
export const TRY_GET_PROFILE = 'TRY_GET_PROFILE';
export const TRY_GET_PROFILES = 'TRY_GET_PROFILES';

export class AddProfile implements Action {
    readonly type = ADD_PROFILE;

    constructor(public payload: Profile) { }
}

export class SetProfile implements Action {
    readonly type = SET_PROFILE;

    constructor(public payload: Profile) { }
}

export class SetProfiles implements Action {
    readonly type = SET_PROFILES;

    constructor(public payload: Profile[]) { }
}

export class TryGetProfile implements Action {
    readonly type = TRY_GET_PROFILE;

    constructor(public payload: string) {}
}

export class TryGetProfiles implements Action {
    readonly type = TRY_GET_PROFILES;

    constructor() {}
}

export type ProfilesActions = AddProfile | SetProfile | SetProfiles | TryGetProfile | TryGetProfiles;
