import * as PermissionsActions from './permissions.actions';

import { Permission } from '../../models/permission.model';

export interface State {
    permissions: Permission[];
}

const initialState: State = {
    permissions: []
};

export function permissionsReducer(state = initialState, action: PermissionsActions.ProfilesActions) {
    switch (action.type) {
        case PermissionsActions.SET_PERMISSION:
            return {
                ...state,
                permissions: [...state.permissions, action.payload]
            };

        case PermissionsActions.SET_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };

        default:
            return state;
    }
}
