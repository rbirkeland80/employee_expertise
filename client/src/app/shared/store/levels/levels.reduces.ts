import * as LevelsActions from './levels.actions';

import { Level } from '../../models/level.model';

export interface State {
    levels: Level[];
}

const initialState: State = {
    levels: []
};

export function levelsReducer(state = initialState, action: LevelsActions.ProfilesActions) {
    switch (action.type) {
        case LevelsActions.SET_LEVEL:
            return {
                ...state,
                levels: [...state.levels, action.payload]
            };

        case LevelsActions.SET_LEVELS:
            return {
                ...state,
                levels: action.payload
            };

        default:
            return state;
    }
}
