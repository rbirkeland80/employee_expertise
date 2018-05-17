import { TestBed } from '@angular/core/testing';

import { PermissionsRichTableHelperService } from './permissions-richTableHelper.service';
import { RichTableColumnBuilderService } from '../../rich-table/rich-tableBaseColumnBuilder.service';
import { StatusTransformPipe } from '../../shared/pipes/statusTransformPipe.pipe';
import { PermissionNameTransformPipe } from './permissionNameTransformPipe.pipe';
import { ColumnDefModel } from '../../rich-table/rich-table.model';

describe('PermissionRichTableHelperService service', () => {
    let service: PermissionsRichTableHelperService;

    beforeEach(() => {
        const StatusTransformPipeMock = {
            statusTransform: {
                transform: value => value
            }
        };
        const RichTableColumnBuilderServiceMock = {
            buildColumnDef: (list, cb) => list
        };
        const configObj = {
            providers: [
                PermissionsRichTableHelperService,
                { provide: RichTableColumnBuilderService, useValue: RichTableColumnBuilderServiceMock },
                { provide: StatusTransformPipe, useValue: StatusTransformPipeMock },
                { provide: PermissionNameTransformPipe, useValue: StatusTransformPipeMock },
                { provide: PermissionNameTransformPipe, useValue: StatusTransformPipeMock }
            ]
        };

        TestBed.configureTestingModule(configObj);

        service = TestBed.get(PermissionsRichTableHelperService);
    });


    it('should buildColumnDef array', () => {
        const columnDef = service.buildColumnDef();

        expect(columnDef.length).toEqual(2);

        columnDef.forEach((column, key) => {
            expect(column.index).toBeDefined();
            expect(column.columnName).toBeDefined();
            expect(column.linkerProperty).toBeDefined();
        });
    });

    it('should buildTableOptions object', () => {
        const options = service.buildTableOptions();

        expect(options.rowClickCb).toEqual(jasmine.any(Function));
        expect(options.paginationActionCb).toEqual(jasmine.any(Function));
        expect(options.sortingEnabled).toBeFalsy();
        expect(options.filteringEnabled).toBeFalsy();
        expect(options.filteringColumns).toBeFalsy();
        expect(options.paginationEnabled).toBeFalsy();
        expect(options.rowsPerPageSettings).toEqual([5, 10, 15]);
    });
});

function fakeRichTableColumnDefinition (): ColumnDefModel[] {
    return [
        {
            index: 0,
            columnName: 'Level',
            isSortable: false,
            linkerProperty: 'name',
            columnWidth: '50%'
        },
        {
            index: 4,
            columnName: 'Status',
            isSortable: false,
            linkerProperty: 'name2',
            columnWidth: '80px'
        }
    ];
}
