import * as ProfilesActions from './profiles.actions';

import { Profile } from '../../models/profile.model';

export interface State {
    profiles: Profile[];
    profile: Profile;
}

const initialState: State = {
    profiles: [],
    profile: null
};

export function profilesReducer(state = initialState, action: ProfilesActions.ProfilesActions) {
    switch (action.type) {
        case ProfilesActions.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };

        case ProfilesActions.SET_PROFILES:
            return {
                ...state,
                profiles: action.payload
            };

        default:
            return state;
    }
}
