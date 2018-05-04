import { ActionReducerMap } from '@ngrx/store';

import * as fromLevels from '../shared/store/levels/levels.reducers';
import * as fromPermissions from '../shared/store/permissions/permissions.reducers';
import * as fromProfiles from '../shared/store/profiles/profiles.reducers';

export interface AppState {
    levels: fromLevels.State;
    permissions: fromPermissions.State;
    profiles: fromProfiles.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    levels: fromLevels.levelsReducer,
    permissions: fromPermissions.permissionsReducer,
    profiles: fromProfiles.profilesReducer
};
