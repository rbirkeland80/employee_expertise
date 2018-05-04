import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as PermissionsActions from './permissions.actions';
import { Permission } from '../../models/permission.model';
import { ApiRequest } from '../../constants/request.constant';

@Injectable()
export class PermissionsEffects {
    private apiBaseUrl = new ApiRequest().base;

    constructor(private actions$: Actions, private http: HttpClient) { }

    @Effect()
    getProfiles = this.actions$
        .ofType(PermissionsActions.TRY_GET_PERMISSIONS)
        .switchMap(() => {
            return this.http.get<[Permission]>(`${this.apiBaseUrl}permissions`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .map((permissions: Permission[]) => {
            console.log(permissions);

            return {
                type: PermissionsActions.SET_PERMISSIONS,
                payload: permissions
            };
        });
}
