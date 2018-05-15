import { Injectable } from '@angular/core';

import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';
import { ColumnDefModel, TableOptions } from '../../rich-table/rich-table.model';

@Injectable()
export class LevelsRichTableHelperService {
    constructor(private statusTransform: StatusTransformPipe) { }

    private deleteItem(id) {
        console.log('delete: ', id);
    }

    buildColumnDef(): ColumnDefModel[] {
        return [
            {
                index: 0,
                columnName: '',
                isSortable: false,
                columnWidth: '35px'
            },
            {
                index: 1,
                columnName: 'Level',
                isSortable: false,
                linkerProperty: 'name',
                columnWidth: '50%'
            },
            {
                index: 2,
                columnName: 'Status',
                isSortable: false,
                pipes: [(value, args) => this.statusTransform.transform(value)],
                linkerProperty: 'active'
            },
            {
                index: 3,
                columnName: 'Rank',
                isSortable: false,
                linkerProperty: 'rank',
                columnWidth: 'calc(30% - 115px)'
            },
            {
                index: 4,
                columnName: 'Actions',
                isSortable: false,
                callback: this.deleteItem,
                columnWidth: '80px'
            }
        ];
    }

    buildTableOptions(): TableOptions {
        return {
            rowClickCb: function (id) {
                console.log('row clicked: ', id);
            },
            rowDeleteCb: function (id) {
                console.log('row clicked: ', id);
            },
            sortingEnabled: false,
            filteringEnabled: false,
            filteringColumns: null, // ['Level', 'Rank']
            paginationEnabled: false,
            rowsPerPageSettings: [5, 10, 15],
            paginationActionCb: function (settings) {
                console.log(settings);
                // settings.rowsPerPage = 10
                // settings.pageNumber = 2
            }
        };
    }
}
