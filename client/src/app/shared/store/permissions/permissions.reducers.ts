import * as PermissionsActions from './permissions.actions';

import { Permission } from '../../models/permission.model';

export interface State {
    permissions: Permission[];
    totalCount: number;
    pageNumber: number;
    rowPerPage: number;
}

const initialState: State = {
    permissions: [],
    totalCount: 0,
    pageNumber: 1,
    rowPerPage: 0
};

export function permissionsReducer(state = initialState, action: PermissionsActions.PermissionsActions) {
    switch (action.type) {
        case PermissionsActions.SET_PERMISSION:
            return {
                ...state,
                permissions: [...state.permissions, action.payload]
            };

        case PermissionsActions.SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.payload
            };

        case PermissionsActions.SET_ROWS_PER_PAGE:
            return {
                ...state,
                rowPerPage: action.payload
            };

        case PermissionsActions.SET_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload
            };

        case PermissionsActions.SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            };

        default:
            return state;
    }
}
