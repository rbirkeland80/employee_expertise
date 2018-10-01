import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as PermissionsActions from './permissions.actions';
import { Permission } from '../../models/permission.model';
import { ApiRequest } from '../../constants/request.constant';

interface ListResponse {
    list: Permission[];
    count: number;
}

@Injectable()
export class PermissionsEffects {
    private apiBaseUrl = new ApiRequest().base;
    private params;

    constructor(private actions$: Actions, private http: HttpClient) { }

    @Effect()
    getProfiles = this.actions$
        .ofType(PermissionsActions.TRY_GET_PERMISSIONS)
        .map((action: PermissionsActions.TryGetPermissions) => {
            return action.payload;
        })
        .switchMap((queryParams: PermissionsActions.GetParams) => {
            let params = '';

            if (queryParams) {
                this.params = params;
                params += '?';

                for (const key in queryParams) {
                    if (key && queryParams.hasOwnProperty(key) && queryParams[key]) {
                        params += `${key}=${queryParams[key]}&`;
                    }
                }
            }

            return this.http.get<ListResponse>(`${this.apiBaseUrl}permissions${params.slice(0, -1)}`, {
                observe: 'body',
                responseType: 'json',
                withCredentials: true
            });
        })
        .switchMap((permissions: ListResponse) => {
            console.log(permissions);

            return [
                {
                    type: PermissionsActions.SET_PERMISSIONS,
                    payload: permissions.list
                },
                {
                    type: PermissionsActions.SET_TOTAL_COUNT,
                    payload: permissions.count
                },
                {
                    type: PermissionsActions.SET_PAGE_NUMBER,
                    payload: this.params.pageNum
                }
            ];
        });
}
