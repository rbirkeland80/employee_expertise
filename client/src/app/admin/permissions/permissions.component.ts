import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TableData, TableOptions } from '../../rich-table/rich-table.model';
import { PermissionsRichTableHelperService } from './permissions-richTableHelper.service';
import { Permission } from '../../shared/models/permission.model';
import * as PermissionsActions from '../../shared/store/permissions/permissions.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'ee-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
    tableData: TableData;
    tableOptions: TableOptions;
    private permissionsState: Observable<{ permissions: Permission[] }>;
    private paginationCb(pageNum, rowsPerPage) {
        const params = {
            pageNum: pageNum,
            rowsPerPage: rowsPerPage
        };

        this.store.dispatch(new PermissionsActions.TryGetPermissions(params));
    }

    constructor(private store: Store<fromApp.AppState>, private tableHelper: PermissionsRichTableHelperService) {
        this.tableData = {
            columnDef: tableHelper.buildColumnDef(),
            list: [],
            totalCount: 0
        };

        this.tableOptions = tableHelper.buildTableOptions(this.paginationCb.bind(this));
    }

    ngOnInit() {
        const params = {
            pageNum: 1,
            rowsPerPage: 5,
            filter: ''
        };
        this.store.dispatch(new PermissionsActions.TryGetPermissions(params));
        this.store.dispatch(new PermissionsActions.SetRowsPerPage(this.tableOptions.rowsPerPageSettings[0]));
        this.permissionsState = this.store.select('permissions');
        this.permissionsState
            .subscribe(
                (state: fromApp.AppState['permissions']) => {
                    if (!state) {
                        return;
                    }
                    this.tableData.list = state.permissions;
                    this.tableData.totalCount = state.totalCount;
                }
            );
    }
}
