import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as LevelsActions from './levels.actions';
import { Level } from '../../models/level.model';
import { ApiRequest } from '../../constants/request.constant';

@Injectable()
export class LevelsEffects {
    private apiBaseUrl = new ApiRequest().base;

    constructor(private actions$: Actions, private http: HttpClient) { }

    @Effect()
    getProfiles = this.actions$
        .ofType(LevelsActions.TRY_GET_LEVELS)
        .switchMap(() => {
            return this.http.get<[Level]>(`${this.apiBaseUrl}levels`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .map((levels: Level[]) => {
            console.log(levels);

            return {
                type: LevelsActions.SET_LEVELS,
                payload: levels
            };
        });
}
