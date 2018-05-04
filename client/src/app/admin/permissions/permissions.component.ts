import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Permission } from '../../shared/models/permission.model';
import * as PermissionsActions from '../../shared/store/permissions/permissions.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'ee-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
    permissions: Permission[];
    private permissionsState: Observable<{ permissions: Permission[] }>;

    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.store.dispatch(new PermissionsActions.TryGetPermissions);
        this.permissionsState = this.store.select('permissions');
        this.permissionsState
            .subscribe(
                (state: { permissions: Permission[] }) => {
                    if (state && state.permissions) {
                        this.permissions = state.permissions;
                    }
                }
            );
    }
}
