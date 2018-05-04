import { Action } from '@ngrx/store';

import { Permission } from '../../models/permission.model';

export const ADD_PERMISSION = 'ADD_PERMISSION';
export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const TRY_GET_PERMISSIONS = 'TRY_GET_PERMISSIONS';

export class AddPermission implements Action {
    readonly type = ADD_PERMISSION;

    constructor(public payload: Permission) { }
}

export class SetPermission implements Action {
    readonly type = SET_PERMISSION;

    constructor(public payload: Permission) { }
}

export class SetPermissions implements Action {
    readonly type = SET_PERMISSIONS;

    constructor(public payload: Permission[]) { }
}

export class TryGetPermissions implements Action {
    readonly type = TRY_GET_PERMISSIONS;

    constructor() {}
}

export type ProfilesActions = AddPermission | SetPermission | SetPermissions | TryGetPermissions;
