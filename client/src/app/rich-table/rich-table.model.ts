export interface DataModel {
    _id: string;
    name: string;
}

export interface ColumnDefModel {
    index: number;
    columnName: string;
    isSortable?: boolean;
    pipes?: Function | Function[] | null;
    linkerProperty?: string | null;
    columnWidth?: string | null;
    callback?: Function;
}

export interface PrivateColumnDefModel extends ColumnDefModel {
    className: string;
    inlineStyles: any;
}

export interface TableOptions {
    rowClickCb?: Function;
    rowDeleteCb?: Function;
    sortingEnabled?: Boolean;
    filteringEnabled?: Boolean;
    filteringColumns?: String[] | null;
    paginationEnabled?: Boolean;
    rowsPerPageSettings?: number[] | null;
    paginationActionCb?: Function;
}

export class TableData {
    constructor(public list: DataModel[], public columnDef: ColumnDefModel[], public totalCount: number) {}
}
