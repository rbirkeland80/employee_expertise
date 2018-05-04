import { ActionReducerMap } from '@ngrx/store';

import * as fromProfiles from '../shared/store/profiles/profiles.reduces';

export interface AppState {
    profiles: fromProfiles.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    profiles: fromProfiles.profilesReducer
};
