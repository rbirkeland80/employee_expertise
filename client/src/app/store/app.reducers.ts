import { ActionReducerMap } from '@ngrx/store';

import * as fromLevels from '../shared/store/levels/levels.reduces';
import * as fromProfiles from '../shared/store/profiles/profiles.reduces';

export interface AppState {
    levels: fromLevels.State;
    profiles: fromProfiles.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    levels: fromLevels.levelsReducer,
    profiles: fromProfiles.profilesReducer
};
