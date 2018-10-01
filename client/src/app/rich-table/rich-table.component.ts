import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { TableData, PrivateColumnDefModel, TableOptions } from './rich-table.model';

@Component({
    selector: 'ee-rich-table',
    templateUrl: './rich-table.component.html',
    styleUrls: ['./rich-table.component.scss']
})
export class RichTableComponent implements OnInit {
    @Input() data: TableData;
    @Input() options: TableOptions;
    @Input() editForm?: TemplateRef<any>;
    private preProcessColumns: Function;
    private sortColumns: Function;
    public columns: PrivateColumnDefModel[];

    constructor() {
        this.preProcessColumns = function (columns) {
            const processedList = columns.map((value) => {
                const defaultWidthValue = 100 / this.data.columnDef.length;

                value.className = value.columnName
                    ? `column-${value.columnName.toLowerCase()}`
                    : 'column';

                value.inlineStyles = {
                    'width': value.columnWidth
                        ? value.columnWidth
                        : `${defaultWidthValue}%`
                };

                return value;
            });

            this.sortColumns(processedList);

            return processedList;
        };

        this.sortColumns = function (list) {
            if (!list) {
                return;
            }

            list.sort((a, b) => {
                return a.index - b.index;
            });
        };
    }

    ngOnInit() {
        this.columns = this.preProcessColumns(this.data.columnDef);
    }

    delete(id, evt) {
        evt.stopPropagation();

        console.log(id);
    }

    toggleRowExpand(id) {
        console.log(id);
    }

    forward(to) {
        if (!to) {
            this.options.paginationActionCb(this.data.totalCount / 5);
        }

        this.options.paginationActionCb(2);
    }

    back(to) {
        if (!to) {
            this.options.paginationActionCb(0);
        }

        this.options.paginationActionCb(1);

    }
}
