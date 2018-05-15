import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TableData, TableOptions } from '../../rich-table/rich-table.model';
import { LevelsRichTableHelperService } from './levels-richTableHelper.service';

import { Level } from '../../shared/models/level.model';
import * as LevelsActions from '../../shared/store/levels/levels.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'ee-levels',
    templateUrl: './levels.component.html',
    styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
    tableData: TableData;
    tableOptions: TableOptions;
    private levelsState: Observable<{ levels: Level[] }>;

    constructor(private store: Store<fromApp.AppState>, private tableHelper: LevelsRichTableHelperService) {
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
        this.store.dispatch(new LevelsActions.TryGetLevels);
        this.levelsState = this.store.select('levels');
        this.levelsState
            .subscribe(
                (state: { levels: Level[] }) => {
                    if (state && state.levels) {
                        this.tableData.list = state.levels;
                    }
                }
            );
    }
}
