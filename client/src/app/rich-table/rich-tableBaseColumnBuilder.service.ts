import { Injectable } from '@angular/core';

import { ColumnDefModel } from './rich-table.model';

@Injectable()
export class RichTableColumnBuilderService {
    constructor() { }

    buildColumnDef(list: ColumnDefModel[], actionCb: Function): ColumnDefModel[] {
        list.forEach(column => {
            column.index = column.index >= list.length ? list.length : column.index + 1;
        });

        const columns = [
            {
                index: 0,
                columnName: '',
                columnWidth: '35px'
            },
            {
                index: 1 + list.length,
                columnName: 'Actions',
                isSortable: false,
                callback: actionCb,
                columnWidth: '80px'
            },
            ...list
        ];

        return columns;
    }
}
