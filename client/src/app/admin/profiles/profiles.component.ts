import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TableData, TableOptions } from '../../rich-table/rich-table.model';
import { ProfilesRichTableHelperService } from './profiles-richTableHelper.service';
import { Profile } from '../../shared/models/profile.model';
import * as ProfilesActions from '../../shared/store/profiles/profiles.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'ee-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
    tableData: TableData;
    tableOptions: TableOptions;
    private profilesState: Observable<{ profiles: Profile[] }>;

    constructor(private store: Store<fromApp.AppState>, private tableHelper: ProfilesRichTableHelperService) {
        this.tableData = {
            columnDef: tableHelper.buildColumnDef(),
            list: []
        };

        this.tableOptions = tableHelper.buildTableOptions();
    }

    openAddForm() {
        console.log('add new opened');
    }

    ngOnInit() {
        this.store.dispatch(new ProfilesActions.TryGetProfiles);
        this.profilesState = this.store.select('profiles');
        this.profilesState
            .subscribe(
                (state: { profiles: Profile[] }) => {
                    if (state && state.profiles) {
                        this.tableData.list = state.profiles;
                    }
                }
            );
    }
}
