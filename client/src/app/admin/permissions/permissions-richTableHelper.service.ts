import { Injectable } from '@angular/core';

import { RichTableColumnBuilderService } from '../../rich-table/rich-tableBaseColumnBuilder.service';
import { PermissionNameTransformPipe } from './permissionNameTransformPipe.pipe';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';
import { ColumnDefModel, TableOptions } from '../../rich-table/rich-table.model';

@Injectable()
export class PermissionsRichTableHelperService {
    constructor(private nameTransform: PermissionNameTransformPipe,
        private statusTransform: StatusTransformPipe,
        private columnBuilder: RichTableColumnBuilderService) { }

    private deleteItem(id) {
        console.log('delete: ', id);
    }

    buildColumnDef(): ColumnDefModel[] {
        const columns = [
            {
                index: 1,
                columnName: 'Permission',
                isSortable: false,
                pipes: [(value, args) => this.nameTransform.transform(value)],
                linkerProperty: 'name',
                columnWidth: '60%'
            },
            {
                index: 2,
                columnName: 'Status',
                isSortable: false,
                pipes: [(value, args) => this.statusTransform.transform(value)],
                linkerProperty: 'active'
            }
        ];

        return this.columnBuilder.buildColumnDef(columns, this.deleteItem);
    }

    buildTableOptions(paginationCb): TableOptions {
        return {
            rowClickCb: function (id) {
                console.log('row clicked: ', id);
            },
            sortingEnabled: false,
            filteringEnabled: false,
            filteringColumns: null, // ['Level', 'Rank']
            paginationEnabled: true,
            rowsPerPageSettings: [5, 10, 15],
            paginationActionCb: paginationCb
        };
    }
}
