import { Action } from '@ngrx/store';

import { Permission } from '../../models/permission.model';

export interface GetParams {
    pageNum: number;
    rowsPerPage: number;
    filter?: String | null;
}

export const ADD_PERMISSION = 'ADD_PERMISSION';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const SET_PERMISSION = 'SET_PERMISSION';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export const TRY_GET_PERMISSIONS = 'TRY_GET_PERMISSIONS';

export class AddPermission implements Action {
    readonly type = ADD_PERMISSION;

    constructor(public payload: Permission) { }
}

export class SetPageNumber implements Action {
    readonly type = SET_PAGE_NUMBER;

    constructor(public payload: number) { }
}

export class SetPermission implements Action {
    readonly type = SET_PERMISSION;

    constructor(public payload: Permission) { }
}

export class SetPermissions implements Action {
    readonly type = SET_PERMISSIONS;

    constructor(public payload: Permission[]) { }
}

export class SetRowsPerPage implements Action {
    readonly type = SET_ROWS_PER_PAGE;

    constructor(public payload: number) { }
}

export class SetTotalCount implements Action {
    readonly type = SET_TOTAL_COUNT;

    constructor(public payload: number) { }
}

export class TryGetPermissions implements Action {
    readonly type = TRY_GET_PERMISSIONS;

    constructor(public payload: GetParams) {}
}

export type PermissionsActions = AddPermission |
    SetPageNumber |
    SetPermission |
    SetPermissions |
    SetRowsPerPage |
    SetTotalCount |
    TryGetPermissions;
