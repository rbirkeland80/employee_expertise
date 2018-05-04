import { Action } from '@ngrx/store';

import { Level } from '../../models/level.model';

export const ADD_LEVEL = 'ADD_LEVEL';
export const SET_LEVEL = 'SET_LEVEL';
export const SET_LEVELS = 'SET_LEVELS';
export const TRY_GET_LEVELS = 'TRY_GET_PROFILES';

export class AddLevel implements Action {
    readonly type = ADD_LEVEL;

    constructor(public payload: Level) { }
}

export class SetLevel implements Action {
    readonly type = SET_LEVEL;

    constructor(public payload: Level) { }
}

export class SetLevels implements Action {
    readonly type = SET_LEVELS;

    constructor(public payload: Level[]) { }
}

export class TryGetLevels implements Action {
    readonly type = TRY_GET_LEVELS;

    constructor() {}
}

export type ProfilesActions = AddLevel | SetLevel | SetLevels | TryGetLevels;
